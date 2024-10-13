import { BaseEntity } from '@app/core/entities';
import { Entity, Column } from 'typeorm';

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
