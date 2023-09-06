import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { UserDto } from '../dto';

/*
[JwtAuthGuard 적용 시 flow]
1. 요청이 컨트롤러에 들어오면 UseGuard를 통해 JwtAuthGuard가 요청을 받습니다.
2. JWT 토큰을 추출하고, 역할 정보를 확인하기 위해 마이크로서비스로 인증 요청을 보냅니다.
3. 인증 서비스는 JWT를 확인하고 사용자 정보와 역할 정보를 반환합니다.
4. 역할 정보가 있는 경우, 해당 역할과 요청 핸들러에 정의된 역할을 비교합니다. 역할이 일치하지 않으면 거부됩니다.
5. 인증이 성공하면 요청의 user 속성에 사용자 정보를 추가하고, true를 반환하여 요청이 허용됩니다.
   오류가 발생하면 false를 반환하여 요청이 거부됩니다.
*/

@Injectable()
// CanActivate 인터페이스를 구현하고 있습니다. 이 인터페이스는 요청의 인증을 확인하는데 사용됩니다.
// 이 클래스는 요청이 허용되는지 여부를 결정하는 canActivate 메서드를 제공합니다.
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    // authClient: 마이크로서비스 간 통신을 위한 ClientProxy 인스턴스입니다. 인증 서비스로 요청을 전송하기 위해 사용됩니다.
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    // reflector: NestJS의 Reflector 클래스로, 메타데이터를 읽고 사용하기 위한 도우미입니다. 역할(role) 정보를 확인하기 위해 사용됩니다.
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;

    if (!jwt) {
      return false;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // authClient.send 메서드를 사용하여 authenticate 메시지를 인증 서비스로 전송합니다. 이 메시지에는 JWT 토큰이 포함됩니다.
    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        // tap 연산자를 사용하여 인증 서비스의 응답을 처리합니다. 이 부분에서 역할(role)을 확인하고, 요청에 역할 정보를 추가합니다.
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('The user does not have valid roles.');
                throw new UnauthorizedException();
              }
            }
          }
          console.log('common JwtAuthGuard res : ', res);
          context.switchToHttp().getRequest().user = res;
        }),
        // map(() => true)을 사용하여 canActivate 메서드가 true를 반환하도록 설정합니다. 이것은 인증에 성공했음을 나타냅니다.
        map(() => true),
        // catchError 연산자를 사용하여 오류가 발생하면 false를 반환하도록 처리합니다. 이 경우 로그를 남기고 요청을 거부합니다.
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}
