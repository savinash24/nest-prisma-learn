import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidateArrayPipe<T extends object> implements PipeTransform {
  constructor(private readonly classType: new () => T) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('In pipe');

    console.log(value, metadata);

    if (!Array.isArray(value)) {
      throw new BadRequestException(
        'Validation failed: payload is not an array',
      );
    }

    const objects = plainToInstance(this.classType, value);

    const errors: ValidationError[] = [];
    for (const object of objects) {
      const validationErrors = await validate(object);
      if (validationErrors.length > 0) {
        errors.push(...validationErrors);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
