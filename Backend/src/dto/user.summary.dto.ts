import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class UserSummaryDto extends BaseDto {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;
}
