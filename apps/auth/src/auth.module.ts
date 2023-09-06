import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  // imports는 외부 모듈 또는 다른 모듈을 현재 모듈에 가져올 때 사용됩니다.
  // 즉, 다른 모듈에서 정의한 클래스 또는 기능을 현재 모듈에서 사용하고 활용할 때 imports를 사용합니다.
  imports: [
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  // providers를 모듈에 등록하면 해당 모듈에서 사용할 수 있는 서비스 또는 클래스를 생성 및 관리할 수 있습니다.
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
