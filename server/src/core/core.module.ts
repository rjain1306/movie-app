import {
  AuditInfoMapperProfile,
} from './mappings';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../utils/logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [
    AuditInfoMapperProfile,
  ],
  exports: [
    AuditInfoMapperProfile,
  ],
})
export class CoreModule {}
