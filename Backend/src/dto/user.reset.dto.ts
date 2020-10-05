import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class UserResetDto {
  @ApiProperty()
  public code: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 30)
  public password: string;
}
