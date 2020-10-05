import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseDto } from './base.dto';
import { UserRole } from '../entities';
import { UserRoles } from 'src/enums';

export class UserCreatedDto extends BaseDto {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({ type: [UserRoles], enum: UserRoles })
  public roles?: UserRole[];

  @ApiProperty()
  public cv?: string;

  @ApiProperty()
  public bio?: string;
}
