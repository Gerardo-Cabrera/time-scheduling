import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity('business')
  export class Business {
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
    services: any;
  }
  