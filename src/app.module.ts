import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { PrismaService } from './common/prisma/prisma.service';
// import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMiddleware } from './middleware/database.middleware';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true, // Ensure that environment variables are available globally
    // }),
    // ,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DatabaseMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}
