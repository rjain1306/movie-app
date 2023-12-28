import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class loginModel {
  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  password: string;
 
  constructor() {}
}