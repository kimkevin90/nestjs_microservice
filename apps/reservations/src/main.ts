import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ReservationsModule } from './reservations.module';

/*
ValidationPipe는 NestJS가 제공하는 내장 파이프 중 하나로, 입력 데이터를 검증하고 변환하는 역할을 합니다. 
whitelist: true 옵션을 설정하면, 유효성 검사가 통과한 데이터만 허용되고, 유효하지 않은 데이터는 필터링됩니다.

간단한 예를 들어보겠습니다. 예를 들어, 클라이언트에서 요청을 보낼 때 필요한 필드는 name, email, password라고 가정해봅시다. 
하지만 클라이언트가 불필요한 필드인 isAdmin을 함께 보내는 경우가 발생할 수 있습니다. 
이때 ValidationPipe의 whitelist: true 옵션을 사용하면, 서버에서는 isAdmin 필드를 무시하고 필요한 필드만을 검증하게 됩니다.
*/
async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
