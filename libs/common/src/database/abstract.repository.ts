import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /*
    type MyType = {
    a: number;
    b: string;
    c: boolean;
    };

      type TypeWithoutB = Omit<MyType, 'b'>; // 'b' 프로퍼티를 제외한 타입 생성
    */
  // _id 프로퍼티를 제외한 도큐먼트 객체를 받기 위해 사용됩니다.
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    // 반환되는 값이 Mongoose 문서 객체가 아닌 일반적인 JSON 객체로 변환되어 클라이언트나 서비스에서 사용하기 용이하게 하기 위함입니다.
    // as unknown을 사용하여 그 결과를 unknown 타입으로 강제 변환합니다. 그리고 as TDocument로 타입을 TDocument로 다시 단언합니다.
    // 이렇게 함으로써 해당 객체가 TDocument 타입을 따른다고 TypeScript에 알려주고, 컴파일러가 해당 타입을 사용하여 추론하도록 만듭니다.
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    // { lean: true } 옵션을 사용하면 Mongoose는 데이터를 조회할 때 문서 객체 대신 일반 JavaScript 객체로 변환하여 반환합니다.
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document as TDocument; // 타입 단언을 사용하여 TDocument 타입으로 변환;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    // new: true 옵션: new 옵션은 findOneAndUpdate 메서드가 실행된 후에 업데이트된 문서를 반환하도록 설정하는 옵션입니다.
    // 기본적으로 findOneAndUpdate는 업데이트 전의 문서를 반환합니다. new: true로 설정하면 업데이트 후의 문서가 반환되므로, 업데이트 후의 데이터를 사용할 수 있습니다.
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }
}
