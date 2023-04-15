import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class BreakTime {
  startHour(startHour: any) {
      throw new Error("Method not implemented.");
  }
  startMinute(startMinute: any) {
      throw new Error("Method not implemented.");
  }
  endHour(endHour: any) {
      throw new Error("Method not implemented.");
  }
  endMinute(endMinute: any) {
      throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  dayOfWeek: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => Service, (service) => service.breakTimes)
  service: Service;
}
