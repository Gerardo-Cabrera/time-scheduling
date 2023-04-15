import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class OpeningHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekday: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => Service, (service) => service.openingHours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'service_id' })
  serviceId: number;
  dayOfWeek: any;
}
