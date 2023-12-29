import { MovieModule } from 'src/movie/movie.module';
import { UsersModule } from './../../users/users.module';
import { SeedDataController } from './seed-data.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    MovieModule,
  ],
  controllers: [SeedDataController],
  providers: [],
  exports: [],
})
export class TypeDataModule {}
