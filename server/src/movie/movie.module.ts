import { AxiosModule } from '../utils/axios/axios.module';
import { AuthModule } from './../utils/auth/auth.module';
import { MovieMapperProfile } from './mappings/movie-mapper-profile';
import { MovieRepository } from './repository';
import { Movie } from './models';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../utils/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { MovieController } from './movie.controller';
import { MovieService } from './services/movie.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AwsFilesModule } from '../utils/aws/s3/aws-file.module';

@Module({ 
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([Movie]),
    CoreModule,
    CqrsModule,
    AuthModule,
    AwsFilesModule,
    AxiosModule,
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    MovieMapperProfile,
    MovieRepository,
  ],
  exports: [
    MovieService,
    MovieMapperProfile,
    MovieRepository,
  ],
})
export class MovieModule {}
