import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class AddMovieModel {

  @ApiProperty({ example: 'string' })
  title: string;

  @ApiProperty({ example: 'string' })
  publishYear: string;

  constructor() {}
}
