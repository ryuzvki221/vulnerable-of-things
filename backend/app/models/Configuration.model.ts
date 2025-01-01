import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vulnerability } from './Vulnerability.model';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpe: string;


  @ManyToOne(() => Vulnerability, vulnerability => vulnerability.affected)
  vulnerability: Vulnerability;
}