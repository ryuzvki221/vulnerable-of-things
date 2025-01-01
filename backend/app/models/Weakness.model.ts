import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vulnerability } from './Vulnerability.model';

@Entity()
export class Weakness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Vulnerability, vulnerability => vulnerability.weaknesses)
  vulnerability: Vulnerability;
}