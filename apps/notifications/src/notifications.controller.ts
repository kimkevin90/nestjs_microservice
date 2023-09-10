import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

/*
 @MessagePattern은 클라이언트 간 메시지 통신에 사용되고, 
 @EventPattern은 이벤트 소스에서 발생하는 이벤트 메시지를 수신하고 처리하는 데 사용됩니다. 
 이벤트 패턴은 주로 비동기 이벤트 처리에 유용합니다. 이러한 메시지와 이벤트 패턴은 NestJS 마이크로서비스 간 효과적인 통신을 지원하는 중요한 요소 중 하나입니다.
*/
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}
