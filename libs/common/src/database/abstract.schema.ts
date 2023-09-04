import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

// @Schema() 데코레이터를 사용하여 Mongoose 스키마로 선언합니다.
@Schema()
// AbastractDocument 클래스는 MongoDB에서 사용되는 추상화된 문서(도큐먼트) 스키마를 정의합니다.
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  // _id 필드는 SchemaTypes.ObjectId 타입으로 선언되어 MongoDB의 고유 ObjectId 값을 나타냅니다.
  _id: Types.ObjectId;
}
