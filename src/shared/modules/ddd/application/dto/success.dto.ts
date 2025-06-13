import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({ example: new Date().toISOString(), type: 'string' })
  timestamp: any;
}

export class SuccessResponseDto {
  data: any;

  meta: MetaDto;
}
