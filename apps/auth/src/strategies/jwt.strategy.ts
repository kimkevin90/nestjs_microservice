import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // jwtFromRequest: JWT 토큰을 HTTP 요청에서 추출하는 방법을 설정합니다.
      //   여기서는 HTTP 요청의 쿠키(request.cookies.Authentication)나 헤더(request.headers.Authentication)에서 토큰을 추출합니다.
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  //   validate({ userId }: TokenPayload): 이 메서드는 Passport-JWT가 JWT 토큰을 성공적으로 검증한 후 호출됩니다.
  //   JWT 페이로드에서 추출한 사용자 ID를 기반으로 usersService를 사용하여 실제 사용자를 검색하고 반환합니다.
  async validate({ userId }: TokenPayload) {
    console.log('validate : ', userId);
    return this.usersService.getUser({ _id: userId });
  }
}
