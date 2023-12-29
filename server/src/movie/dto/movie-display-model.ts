import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

import {
  AuditInfoDto,
} from '../../core/dto';

export class MovieDisplayModel {
  @ApiProperty({ example: uuid() })
  @AutoMap()
  id: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  title: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  publishYear: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  imageUrl: string;
  
  @AutoMap()
  @ApiProperty({ type: AuditInfoDto })
  auditInfo: AuditInfoDto;
}
