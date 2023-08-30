import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  number: string;
  @Column()
  address: string;
  @Column()
  work: string;
  @Column()
  description: string;
}
