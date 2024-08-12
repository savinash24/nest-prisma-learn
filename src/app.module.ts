import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseMiddleware } from './middleware/database.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DatabaseMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        // Add more routes to exclude here
      )
      .forRoutes('*'); // Apply to all routes
  }
}
