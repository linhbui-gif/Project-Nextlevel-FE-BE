import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from './base.dto';

export class JobCreatedDto extends BaseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  public description: string;
}
