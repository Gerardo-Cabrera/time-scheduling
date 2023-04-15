import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Service } from '../../../entities/service.entity';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from 'src/modules/appointment/dto/create-service.dto';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private serviceService: ServiceService) {}

  @Query(() => [Service])
  async services(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Query(() => Service, { nullable: true })
  async service(@Args('id', { type: () => Int }) id: number): Promise<Service | undefined> {
    return this.serviceService.findById(id);
  }

  @Mutation(() => Service)
  async createService(@Args('serviceData') serviceData: CreateServiceDto): Promise<Service> {
    return this.serviceService.createService(serviceData);
  }

  @Mutation(() => Service)
  async updateService(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ): Promise<Service> {
    return this.serviceService.update(id, { name });
  }

  @Mutation(() => Boolean)
  async deleteService(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    try {
      await this.serviceService.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
