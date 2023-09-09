import { CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date) // 입력 데이터를 Date 객체로 변환
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  /*
  @IsDefined(): 해당 속성이 정의되었는지 확인하는 데코레이터입니다. 속성 값이 null 또는 undefined인지 확인합니다.

  @IsNotEmptyObject(): 해당 속성이 빈 객체가 아닌지 확인하는 데코레이터입니다. 즉, 해당 속성이 빈 객체 {}가 아닌 경우를 검사합니다.

  @ValidateNested(): 해당 속성이 중첩된 객체인 경우 내부 객체의 유효성 검사를 수행하기 위한 데코레이터입니다. 이 데코레이터는 중첩된 객체에 대한 유효성 검사를 활성화하며, 중첩된 객체의 속성에 다른 유효성 검사 데코레이터를 적용할 수 있게 합니다.
  */
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
