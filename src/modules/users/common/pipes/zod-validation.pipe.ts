import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodType, ZodTypeDef } from 'zod';

@Injectable()
export class ZodValidationPipe<TInput = unknown, TOutput = TInput>
  implements PipeTransform
{
  constructor(private schema: ZodType<TOutput, ZodTypeDef, TInput>) {}

  /**
   * Valida y transforma el valor de entrada según el esquema Zod.
   * @param value - valor de entrada a validar
   * @returns valor validado y transformado según el esquema
   * @throws BadRequestException en caso de validación fallida
   */
  transform(value: TInput): TOutput {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(
        result.error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      );
    }
    return result.data;
  }
}
