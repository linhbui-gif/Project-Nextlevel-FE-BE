import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  @IsEmail({}, { message: "You must provide a correct email address" })
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 30)
  public password: string;

  @ApiProperty()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  public cv: string;
}
