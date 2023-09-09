import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    /*
    @Inject(PAYMENTS_SERVICE)를 통해 ReservationsService 클래스에 PAYMENTS_SERVICE로 정의된 서비스를 주입하며, 
    해당 서비스는 ClientProxy 타입의 paymentService 변수에 저장되어 다른 메서드에서 사용할 수 있게 됩니다. 이것은 의존성 주입을 통해 서로 다른 모듈 간에 서비스를 공유하고 협력하는 데 도움이 됩니다.
    */
    @Inject(PAYMENTS_SERVICE) paymentService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { _id: userId }: UserDto,
  ) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  async findAll() {
    console.log('실행 서비스 get');
    const result = this.reservationsRepository.find({});
    console.log('완료 서비스 get');
    return result;
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
