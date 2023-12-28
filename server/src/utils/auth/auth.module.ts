import { AxiosModule } from '../../utils/axios/axios.module';
import { LoggerModule } from './../logger/logger.module';
import { BasicAuthGuard } from './guards/basic-auth-guard';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/models';

@Module({
  imports: [LoggerModule, JwtModule.register({
    secret: 'movie-secret',
    signOptions: {expiresIn: '1h'}
  }), HttpModule, AxiosModule, TypeOrmModule.forFeature([User])],
  exports: [
    BasicAuthGuard,
    JwtModule,
    AuthService,
    AuthRepository
  ],
  controllers: [AuthController],
  providers: [
    BasicAuthGuard,
    AuthService,
    AuthRepository
  ],
})
export class AuthModule {}
