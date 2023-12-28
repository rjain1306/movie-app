import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { AutoMap } from '@automapper/classes';

export class AuditInfoDto {
  @IsDateString()
  @ApiProperty({ example: new Date() })
  @IsOptional()
  @AutoMap()
  createdAt: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: uuid() })
  @AutoMap()
  createdBy?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: new Date() })
  @AutoMap()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: uuid() })
  @AutoMap()
  updatedBy?: string;
}
