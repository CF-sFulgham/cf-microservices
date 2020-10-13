import { Injectable, ClassSerializerInterceptor, PlainLiteralObject } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

@Injectable()
export class SerializationInterceptor extends ClassSerializerInterceptor {

  transformToPlain(
    plainOrClass: any,
    options: ClassTransformOptions,
  ): PlainLiteralObject {
    return this.stripClass(super.transformToPlain(plainOrClass, options));
  }

  stripClass(response: {[t: string]: any}): any {
    Object.keys(response).forEach((key) => {
      if (key === '@CLASS') {
        delete (response[key]);
        return;
      }
      if (typeof(response[key]) === 'object' && response[key] !== null && typeof(response[key].length) === 'undefined') {
        response[key] = this.stripClass(response[key]);
      }
    });
    return response;
  }
}
