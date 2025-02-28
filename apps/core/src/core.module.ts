import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggingMiddleware } from '@app/common/middlewares/logging.middleware';
import { RmqModule } from '@app/common';
import { PARSEQR_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: './apps/core/.env'
    }),
    RmqModule.register({
      name: PARSEQR_SERVICE
    })
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*')
  }
}
