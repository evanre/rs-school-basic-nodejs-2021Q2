import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(
    value: string,
    { metatype }: ArgumentMetadata,
  ): Promise<string> {
    const obj = plainToClass(metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(({ property, constraints }) => {
        return `${property} - ${Object.values(constraints || {}).join(', ')}`;
      });
      throw new ValidationException(messages);
    }

    return value;
  }
}
