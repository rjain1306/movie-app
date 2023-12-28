import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

import {
  AuditInfoDto,
} from '../../core/dto';

export class UserDisplayModel {
  @ApiProperty({ example: uuid() })
  @AutoMap()
  id: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  name: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  emailAddress: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  imageUrl: string;
  
  @AutoMap()
  @ApiProperty({ type: AuditInfoDto })
  auditInfo: AuditInfoDto;
}
