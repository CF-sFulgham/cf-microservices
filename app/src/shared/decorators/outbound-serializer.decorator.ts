import { SerializeOptions } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

const SERIALIZER_DEFAULTS = {
  excludePrefixes: ['@'],
};

export function OutboundSerializer(options?: ClassTransformOptions) {
  return SerializeOptions(Object.assign({}, SERIALIZER_DEFAULTS, options));
}
