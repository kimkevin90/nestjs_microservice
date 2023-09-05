import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
/*
@Prop() 데코레이터는 Mongoose 스키마의 각 필드(property)를 정의할 때 사용되는 것으로, 
해당 필드가 어떤 속성을 가지는지를 설정합니다.
Mongoose는 MongoDB의 문서(Document)를 정의하고 다룰 때 사용되며, 
@Prop() 데코레이터를 이용하여 필드의 타입, 유효성 검사 규칙, 기본값 등을 설정할 수 있습니다
*/
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  invoiceId: string;
}

/*
SchemaFactory.createForClass() 메서드를 사용하여 클래스로부터 Mongoose 스키마를 생성할 때, 
각 필드에 @Prop() 데코레이터를 사용하여 필드의 속성을 정의합니다. 
필드에는 데이터 타입, 유효성 검사 규칙, 기본값 등을 설정할 수 있습니다.
*/
export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
