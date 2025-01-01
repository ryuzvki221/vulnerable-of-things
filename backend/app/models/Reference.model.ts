import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vulnerability } from './Vulnerability.model';

@Entity()
export class Reference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Vulnerability, vulnerability => vulnerability.references)
  vulnerability: Vulnerability;
}