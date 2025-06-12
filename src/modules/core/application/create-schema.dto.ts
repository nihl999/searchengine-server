import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { randomUUID } from 'crypto';

enum FieldDTOType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  GEOPOINT = 'geo-point',
}

enum FieldDTOSearchability {
  TEXT = 'text',
  KEYWORD = 'keyword',
  BOTH = 'both',
}

export class FieldDTO {
  @IsEnum(FieldDTOType)
  type: FieldDTOType;
  @IsEnum(FieldDTOSearchability)
  searchability: FieldDTOSearchability;
}

export class CreateSchemaUsecaseInput {
  @ApiProperty({ example: randomUUID(), format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDTO)
  fields: FieldDTO[];
}

export class CreateSchemaUsecaseOutput {
  id: string;
}
