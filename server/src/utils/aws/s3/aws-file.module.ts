import { LoggerModule } from '../../logger/logger.module';
import { Module } from '@nestjs/common';
import { AwsFilesService } from './aws-file.service';

@Module({
  imports: [LoggerModule],
  exports: [AwsFilesService],
  providers: [AwsFilesService],
})
export class AwsFilesModule {}
