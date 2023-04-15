import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from './appointment/repositories/service.repository';
import { ServiceService } from './appointment/services/service.service';
import { ServiceResolver } from './appointment/resolvers/service.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRepository])],
  providers: [ServiceService, ServiceResolver],
  exports: [ServiceService],
})
export class ServiceModule {}
