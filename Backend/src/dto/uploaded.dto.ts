import { ApiProperty } from "@nestjs/swagger";

export class UploadedDto {
  @ApiProperty()
  url: string;
  
  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;
}
