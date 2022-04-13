import { IsOptional } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Site {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;
  @Column()
  customer: string;
  @Column()
  peakPower: number;
  @Column()
  loadPeak: number;

  @Column(() => Producer)
  producers?: Producer[];

  @Column(() => Consumer)
  consumers?: Consumer[];
}

export class Producer {
  @Column()
  connectorId: string;
  @Column()
  name: string;
  @Column()
  peakPower: number;
  @Column()
  @IsOptional()
  currentPower?: number;
  @Column()
  type: string;
}

export class Consumer {
  @Column()
  connectorId: string;
  @Column()
  name: string;
  @Column()
  peakConsumption: number;
  @Column()
  @IsOptional()
  currentConsumption?: number;
}
