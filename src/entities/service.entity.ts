import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
import { Appointment } from './appointment.entity';
import { BreakTime } from './break-time.entity';
import { OpeningHour } from './opening-hour.entity';
  
@Entity()
    export class Service {
    startHour(startHour: number) {
        throw new Error("Method not implemented.");
    }
    endHour(endHour: number) {
        throw new Error("Method not implemented.");
    }
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'int' })
    slotDuration: number;

    @Column({ type: 'int' })
    slotGap: number;

    @Column({ type: 'int' })
    maxClientsPerSlot: number;

    @Column({ type: 'int' })
    appointmentDuration: number;

    @Column({ type: 'int' })
    breakDuration: number;

    @OneToMany(() => OpeningHour, (openingHour) => openingHour.service)
    openingHours: OpeningHour[];

    @OneToMany(() => BreakTime, (breakTime) => breakTime.service)
    breakTimes: BreakTime[];

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments: Appointment[];
}
  