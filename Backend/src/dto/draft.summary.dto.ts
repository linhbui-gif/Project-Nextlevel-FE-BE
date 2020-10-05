import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto, UserSummaryDto } from '.';

export class DraftSummaryDto extends BaseDto {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ type: UserSummaryDto })
  public author: UserSummaryDto;
  
  @ApiProperty()
  public article?: string;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public coverImage?: string;
}
