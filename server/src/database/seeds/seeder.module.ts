import { LoggerModule } from './../../utils/logger/logger.module';
import { AppSeeder } from './app.seeder';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { CoreModule } from '../../core/core.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    CoreModule,
    LoggerModule
  ],
  providers: [AppSeeder],
})
export class SeederModule {}
