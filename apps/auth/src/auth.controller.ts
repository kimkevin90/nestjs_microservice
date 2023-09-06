import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser, UserDocument } from '@app/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth-guard';

/*
[passthrough: true 옵션]
: { passthrough: true } 옵션을 사용하면 응답 객체를 수정할 수 있습니다. 
기본적으로, NestJS는 컨트롤러 메서드의 응답 객체를 수정할 수 없습니다. 하지만 { passthrough: true }를 설정하면 컨트롤러 메서드에서 응답 객체를 변경하거나 데이터를 추가할 수 있습니다.

예를 들어, 컨트롤러 메서드 내에서 response.status(200)과 같이 상태 코드를 설정하거나, 
response.header('Content-Type', 'application/json')와 같이 응답 헤더를 추가하거나, response.cookie('token', 'abc123')와 같이 쿠키를 설정할 수 있습니다.

이렇게 주입된 response 객체를 통해 컨트롤러 메서드는 클라이언트에게 응답을 보내고 HTTP 상태, 헤더, 쿠키, 본문 등을 조작할 수 있게 됩니다.
*/

/*
로그인 과정
1. @UseGuards(LocalAuthGuard)를 사용하여 LocalAuthGuard를 적용하면 해당 Guard가 실행됩니다.
2. LocalAuthGuard 내에서 passport.authenticate('local')가 호출되고, LocalStrategy의 validate 메서드가 실행됩니다.
3. LocalStrategy의 validate 메서드에서 인증이 성공하면 해당 사용자 정보가 request 객체에 저장됩니다.
4. @CurrentUser() 데코레이터를 사용하여 컨트롤러 메서드의 매개변수에 주입된 request 객체에서 사용자 정보를 추출하여 컨트롤러 메서드에 전달됩니다.
*/

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  // JwtAuthGuard로 jwtFromRequest -> validate 이어지면서 return this.usersService.getUser 진행하여 user 존재
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
