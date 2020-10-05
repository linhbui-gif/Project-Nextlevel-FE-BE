import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  public description: string;
}
