import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<Date, Date> {
  description = 'Date custom scalar type';

  parseValue(value: Date): Date {
    return new Date(value); // Convert the incoming date value to a JavaScript Date object
  }

  serialize(value: Date): Date {
    return value; // Pass through the date value
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert the incoming string value to a JavaScript Date object
    }
    return null;
  }
}
