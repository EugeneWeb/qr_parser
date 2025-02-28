import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigEnum } from '@app/common/helpers/config-enum';
import { HttpExceptionFilter } from '@app/common/exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(ConfigEnum.PORT);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix('api/v1');

  await app.listen(port ?? 3000);
}
bootstrap();
