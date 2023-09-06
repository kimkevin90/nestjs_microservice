//depriciated
// 각 모듈에 직접 config 설정한다 -> 각 모듈 별 필요한 config 설정이 다르므로
import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

/*
위 코드에서 NestConfigModule.forRoot()는 @nestjs/config 모듈의 ConfigModule을 설정하기 위해 사용되고 있습니다. 이때 forRoot() 메서드는 다음과 같은 역할을 수행합니다:

애플리케이션의 설정 정보를 초기화합니다.
환경 변수를 로드하여 설정 정보를 생성합니다.
생성된 설정 정보를 사용하여 모듈을 초기화합니다.
forRoot()를 호출함으로써 @nestjs/config 모듈은 애플리케이션의 설정을 구성하고, 환경 변수를 로드하며, 설정 정보를 생성하여 모듈을 준비하는 작업을 수행합니다. 이렇게 하면 애플리케이션 전체에서 설정 정보를 편리하게 사용할 수 있게 됩니다.


-> forRoot()를 적용하지 않을 시 아래와 같이 적용
@Module({
  imports: [],
})
export class MyModule {
  constructor() {
    // 모듈 설정과 환경 변수 로딩 수동 처리
    ConfigModule.forRoot({
      envFilePath: '.env', // 환경 변수 파일 경로 지정
    });
  }
}
*/
