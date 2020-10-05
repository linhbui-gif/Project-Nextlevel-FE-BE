import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class DraftDto {
  @ApiProperty()
  @IsOptional()
  public id?: string;

  @ApiProperty()
  @IsOptional()
  public article?: string;

  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  public body: string;

  @ApiProperty()
  @IsNotEmpty()
  public author: string;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public coverImage?: string;
}
