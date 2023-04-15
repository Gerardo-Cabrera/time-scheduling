import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../../../entities/business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private serviceRepository: Repository<Business>,
  ) {}

  async createService(serviceData: Partial<Business>): Promise<Business> {
    const service = this.serviceRepository.create(serviceData);
    await this.serviceRepository.save(service);
    return service;
  }

  async findAll(): Promise<Business[]> {
    return this.serviceRepository.find();
  }

  async findById(id: number): Promise<Business> {
    return this.serviceRepository.findOne(id);
  }
}