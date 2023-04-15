import { Injectable } from '@nestjs/common';
import { BreakTime } from '../../../entities/break-time.entity';
import { OpeningHour } from '../../../entities/opening-hour.entity';
import { Service } from '../../../entities/service.entity';
import { ServiceRepository } from '../repositories/service.repository';
import { CreateServiceDto } from 'src/modules/appointment/dto/create-service.dto';

@Injectable()
export class ServiceService {
  openingHourRepository: any;
  breakTimeRepository: any;
  constructor(private serviceRepository: ServiceRepository) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findById(id: number): Promise<Service | undefined> {
    return this.serviceRepository.findOne(id);
  }

  async create(serviceData: Partial<Service>): Promise<Service> {
    const newService = this.serviceRepository.create(serviceData);
    return this.serviceRepository.save(newService);
  }

  async update(id: number, serviceData: Partial<Service>): Promise<Service> {
    await this.serviceRepository.update(id, serviceData);
    const updatedService = await this.serviceRepository.findOne(id);
    if (!updatedService) {
      throw new Error(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async delete(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Service with ID ${id} not found`);
    }
  }

  async createService(serviceData: CreateServiceDto): Promise<Service> {
    const service = new Service();
    service.name = serviceData.name;
    service.slotDuration = serviceData.slotDuration;
    service.slotGap = serviceData.slotGap;
    service.maxClientsPerSlot = serviceData.maxClientsPerSlot;
    service.appointmentDuration = serviceData.appointmentDuration;
    service.breakDuration = serviceData.breakDuration;
  
    const savedService = await this.serviceRepository.save(service);
  
    const openingHours = serviceData.openingHours.map((oh) => {
      const openingHour = new OpeningHour();
      openingHour.dayOfWeek = oh.dayOfWeek;
      openingHour.startTime = oh.startTime;
      openingHour.endTime = oh.endTime;
      openingHour.service = savedService;
      return openingHour;
    });
  
    const breakTimes = serviceData.breakTimes.map((bt) => {
      const breakTime = new BreakTime();
      breakTime.dayOfWeek = bt.dayOfWeek;
      breakTime.startTime = bt.startTime;
      breakTime.endTime = bt.endTime;
      breakTime.service = savedService;
      return breakTime;
    });
  
    await this.openingHourRepository.save(openingHours);
    await this.breakTimeRepository.save(breakTimes);
  
    return savedService;
  }

  async getOpeningHoursForService(serviceId: number): Promise<OpeningHour[]> {
    const service = await this.serviceRepository.findOne(serviceId);
    if (!service) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }
    return service.openingHours;
  }
}
