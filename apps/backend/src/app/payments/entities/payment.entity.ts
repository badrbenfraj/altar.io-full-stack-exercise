import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  amount: number;

  @Column()
  code: string;

  @Column('text', { array: true })
  grid: string[][];
}
