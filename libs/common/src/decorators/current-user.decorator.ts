import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';

/*
getCurrentUserByContext 함수는 요청 컨텍스트에서 인증된 사용자를 검색합니다.
이를 위해 context.switchToHttp().getRequest().user를 사용하여 인증 프로세스 중에 요청에 저장된 사용자 객체에 액세스합니다.
라우트 핸들러에서 매개변수로 @CurrentUser()를 사용하면 자동으로 getCurrentUserByContext를 호출하여 인증된 사용자 객체를 제공합니다. 
그런 다음이 사용자 객체를 사용하여 현재 사용자의 식별 정보를 기반으로 작업을 수행할 수 있습니다.
*/
const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
