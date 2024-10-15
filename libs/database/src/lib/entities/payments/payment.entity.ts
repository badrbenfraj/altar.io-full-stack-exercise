import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Payments extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  amount: number;

  @Column()
  code: string;

  @Column('text', { array: true })
  grid: string[][];
}
