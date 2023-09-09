import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  constructor(
    private readonly configService: ConfigService, // @Inject(NOTIFICATIONS_SERVICE)
  ) {}

  // async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
  //   const paymentMethod = await this.stripe.paymentMethods.create({
  //     type: 'card',
  //     card,
  //   });

  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     payment_method: paymentMethod.id,
  //     amount: amount * 100,
  //     confirm: true,
  //     payment_method_types: ['card'],
  //     currency: 'usd',
  //   });

  //   this.notificationsService.emit('notify_email', {
  //     email,
  //     text: `Your payment of $${amount} has completed successfully.`,
  //   });

  //   return paymentIntent;
  // }

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    return paymentIntent;
  }
}