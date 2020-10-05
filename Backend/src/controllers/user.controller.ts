import { Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards, Body, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UserService, AuthService } from '../services';
import { UserDto, UserCreatedDto, UserLoginDto, UserTokenDto, FileDto, UserForgotDto, UserResetDto, UploadedDto } from '../dto';
import { Roles } from 'src/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserNotFound } from 'src/errors/user-not-found.error';

type UncleanedUser = UserDto & {
  roles: any;
  updatedDate: any;
  createdDate: any;
};

@ApiTags('User')
@Controller('user') // route ở đây localhỏ:5000/user user = @Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: HttpStatus.OK,  type: UserTokenDto })
  public async signup(@Body() user: UncleanedUser): Promise<UserTokenDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles, id, updatedDate, createdDate, ...cleanedUser } = user;
    const newUser = await this.userService.create(cleanedUser);
    return this.authService.login(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: HttpStatus.OK, type: UserTokenDto })
  public login(@Request() req): Promise<UserTokenDto> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiResponse({ status: HttpStatus.OK,  type: UserCreatedDto })
  public getProfile(@Request() req): UserCreatedDto {
    return req.user;
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  public updateProfile(@Body() user: UserCreatedDto): Promise<UserCreatedDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles, createdDate, ...cleanedUser } = user;
    return this.userService.update(user.id, cleanedUser);
  }
  
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Boolean })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: UserNotFound, description: "The user was not found" })
  @ApiBody({ type: UserForgotDto })
  @Post('forgot-password')
  public forgotPassword(@Body('email') email: string): Promise<boolean> {
    return this.authService.forgotPassword(email);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBody({ type: UserResetDto })
  @Post('reset-password')
  public resetPassword(@Body('code') code: string, @Body('password') password: string): Promise<UserTokenDto> {
    return this.authService.resetPassword(code, password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('upload/profile')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload profile image',
    type: FileDto,
  })
  @ApiResponse({ type: UploadedDto, status: HttpStatus.OK })
  uploadProfile(@UploadedFile() file) {
    return {
      mimetype: file.mimetype,
      url: file.path.replace('public/', ''),
      size: file.size
    };
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('jwt'))
  @Post('upload/cv')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'public/upload/user/cv',
    limits: {
      files: 1,
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload CV',
    type: FileDto,
  })
  @ApiResponse({ type: UploadedDto, status: HttpStatus.OK })
  uploadCV(@UploadedFile() file) {
    return {
      mimetype: file.mimetype,
      url: file.path.replace('public/', ''),
      size: file.size
    };
  }
}