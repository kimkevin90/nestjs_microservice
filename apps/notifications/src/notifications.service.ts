import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log('email : ', email);
    // await this.transporter.sendMail({
    //   from: this.configService.get('SMTP_USER'),
    //   to: email,
    //   subject: 'Sleepr Notification',
    //   text,
    // });
  }
}
