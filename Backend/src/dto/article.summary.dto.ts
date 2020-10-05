import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto, UserSummaryDto } from '.';

export class ArticleSummaryDto extends BaseDto {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ type: UserSummaryDto })
  public author: UserSummaryDto;
  
  @ApiProperty()
  public draftId?: string;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public coverImage?: string;
}
