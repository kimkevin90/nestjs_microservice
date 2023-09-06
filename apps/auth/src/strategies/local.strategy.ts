import { Injectable, UnauthorizedException } from '@nestjs/common';
/*
PassportStrategy 클래스는 NestJS에서 Passport 전략을 사용하기 위한 커스텀 전략을 정의할 때 사용됩니다.
이 클래스를 확장하면 NestJS 애플리케이션에서 Passport 전략을 편리하게 사용할 수 있으며, 
NestJS의 의존성 주입 시스템과 통합되어 사용자 정의 서비스 및 설정을 주입할 수 있습니다.
*/
import { PassportStrategy } from '@nestjs/passport';
// passport-local은 Passport.js의 로컬 전략을 구현한 라이브러리로, 로컬 인증 (사용자명 및 비밀번호)을 처리하는 데 사용됩니다.
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

// 'local'은 전략의 이름을 나타냅니다.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UsersService) {
    // super({ usernameField: 'email' }): 부모 클래스인 PassportStrategy의 생성자를 호출하고,
    // 전략이 사용자의 이메일 주소를 기반으로 인증을 수행하도록 설정합니다.
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    try {
      return this.userService.verifyUser(email, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
