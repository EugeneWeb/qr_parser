import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ParseServiceModule } from './parse_service.module';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(ParseServiceModule);
  const rmqService = context.get<RmqService>(RmqService);

  const microservice = await NestFactory.createMicroservice(
    ParseServiceModule,
    rmqService.getOptions('PARSEQR'),
  );

  await microservice.listen();
}
bootstrap();
