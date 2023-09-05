import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string | undefined;

  @Column()
  email: string | undefined;
}