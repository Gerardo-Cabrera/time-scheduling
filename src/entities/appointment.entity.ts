import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Service } from './service.entity';
  
  @Entity()
  export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'timestamp' })
    startTime: Date;
  
    @ManyToOne(() => Service, (service) => service.appointments, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'service_id' })
    service: Service;
  
    @Column({ name: 'service_id' })
    serviceId: number;
      user: any;
  }
  