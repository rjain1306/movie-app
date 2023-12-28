import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class AddUserModel {
  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  passwordConfirm: string;
  /**
   *
   */
  constructor() {}
}
