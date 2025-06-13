import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(FieldDTOType)
  type: FieldDTOType;
  @IsEnum(FieldDTOSearchability)
  searchability: FieldDTOSearchability;
}

const BookDetailsFieldsExample: FieldDTO[] = [
  {
    name: 'Title',
    type: FieldDTOType.TEXT,
    searchability: FieldDTOSearchability.KEYWORD,
  },
  {
    name: 'Description',
    type: FieldDTOType.TEXT,
    searchability: FieldDTOSearchability.TEXT,
  },
];
export class CreateSchemaUsecaseInput {
  @ApiProperty({ example: 'Book details' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: BookDetailsFieldsExample })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDTO)
  fields: FieldDTO[];
}

export class CreateSchemaUsecaseOutput {
  @ApiProperty()
  id: string;
}
