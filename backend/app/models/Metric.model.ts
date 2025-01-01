import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vulnerability } from './Vulnerability.model';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;
  @Column({type: "decimal", precision: 10, scale: 2, nullable:true})
  baseScore: number;
  @Column({ nullable:true})
  severity: string;
  @Column({type: "decimal", precision: 10, scale: 2, nullable:true})
  exploitabilityScore: number;
  @Column({type: "decimal", precision: 10, scale: 2, nullable:true})
  impactScore: number;
  @Column({ nullable:true})
  vector: string;

  @ManyToOne(() => Vulnerability, vulnerability => vulnerability.metrics)
  vulnerability: Vulnerability;
}