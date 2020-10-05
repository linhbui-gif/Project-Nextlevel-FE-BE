import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto, UserSummaryDto, ArticleCreatedDto } from '.';

export class DraftCreatedDto extends BaseDto {
  @ApiProperty()
  public id?: string;

  @ApiProperty({ type: ArticleCreatedDto })
  public article?: ArticleCreatedDto;

  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  public body: string;

  @ApiProperty({ type: UserSummaryDto })
  public author: UserSummaryDto;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public coverImage?: string;
}
