import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  public createdDate?: Date;
  
  @ApiProperty()
  public updatedDate?: Date;
}
