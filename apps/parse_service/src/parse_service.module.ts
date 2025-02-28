import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ParseServiceController } from './parse_service.controller';
import { ParseServiceService } from './parse_service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_PARSEQR_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/parse_service/.env',
    }),
    RmqModule,
    HttpModule,
  ],
  controllers: [ParseServiceController],
  providers: [ParseServiceService],
})
export class ParseServiceModule {}
