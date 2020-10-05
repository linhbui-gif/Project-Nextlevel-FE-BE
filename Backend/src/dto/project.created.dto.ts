import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from './base.dto';

export class ProjectCreatedDto extends BaseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public description: string;

  @ApiProperty()
  public imageGallery: string[];
}
