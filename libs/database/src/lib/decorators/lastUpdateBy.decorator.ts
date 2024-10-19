import { JoinColumn, ManyToOne } from 'typeorm';

type Constructor<T = object> = new (...args: T[]) => T;

export function LastUpdatedBy<T>(type: Constructor<T>): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    ManyToOne(() => type, { nullable: true })(target, propertyName);
    JoinColumn({ name: 'lastUpdateBy' })(target, propertyName);
  };
}
