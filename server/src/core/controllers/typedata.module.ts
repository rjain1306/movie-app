import { UsersModule } from './../../users/users.module';
import { SeedDataController } from './seed-data.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [SeedDataController],
  providers: [],
  exports: [],
})
export class TypeDataModule {}
