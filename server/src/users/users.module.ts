import { AxiosModule } from '../utils/axios/axios.module';
import { AuthModule } from './../utils/auth/auth.module';
import { UsersMapperProfile } from './mappings/user-mapper-profile';
import { UserRepository } from './repository';
import { User } from './models';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../utils/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AwsFilesModule } from '../utils/aws/s3/aws-file.module';

@Module({ 
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    CoreModule,
    CqrsModule,
    AuthModule,
    AwsFilesModule,
    AxiosModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersMapperProfile,
    UserRepository,
  ],
  exports: [
    UsersService,
    UsersMapperProfile,
    UserRepository,
  ],
})
export class UsersModule {}
