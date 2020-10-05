import { ApiProperty } from "@nestjs/swagger";

export class UserForgotDto {
  @ApiProperty()
  public email: string;
}
