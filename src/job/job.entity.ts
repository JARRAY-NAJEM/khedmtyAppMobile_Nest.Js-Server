import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job: string;

  @Column()
  image: string;
  @Column()
  howMatch: string;
}
