import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '../logger/logger.module';
import { Module } from '@nestjs/common';
import { AxiosService } from './services/axios.service';

@Module({
  imports: [LoggerModule, HttpModule],
  exports: [AxiosService],
  providers: [AxiosService],
})
export class AxiosModule {}
