import { TypeDataModule } from './core/controllers/typedata.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './utils/auth/middlewares/auth-middleware';
import { AuthModule } from './utils/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeDataModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth').forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
