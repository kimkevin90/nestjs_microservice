// import { CreateChargeDto } from '@app/common';
// import { IsEmail } from 'class-validator';

import Stripe from 'stripe';

// export class PaymentsCreateChargeDto extends CreateChargeDto {
//   @IsEmail()
//   email: string;
// }

export class CreateChargeDto {
  card: Stripe.PaymentMethodCreateParams.Card1;
  amount: number;
}
