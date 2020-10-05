import { ApiProperty } from "@nestjs/swagger";

export class FilesDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  files: any;
}
