import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

/*
MongooseModule.forFeature()는 @nestjs/mongoose 모듈을 사용하여 Mongoose 스키마를 등록하는 메서드입니다. 
이 메서드를 사용하면 모듈 내에서 사용할 Mongoose 스키마를 등록하고 관리할 수 있습니다. 
name: 등록할 Mongoose 모델의 이름 (예: ReservationDocument.name)
schema: 등록할 Mongoose 스키마 (예: ReservationSchema)

*/
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
