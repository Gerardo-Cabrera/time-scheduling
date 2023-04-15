import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Business } from '../../../entities/business.entity';
import { BusinessService } from '../services/business.service';

@Resolver(() => Business)
export class ServiceResolver {
  BusinessService: any;
  constructor(private businessService: BusinessService) {}

  @Query(() => [Business])
  async business(): Promise<Business[]> {
    return this.businessService.findAll();
  }

  @Mutation(() => Business)
  async createService(
    @Args('name') name: string,
    @Args('slotDuration') slotDuration: number,
    @Args('slotGap') slotGap: number,
    @Args('maxClientsPerSlot') maxClientsPerSlot: number,
  ): Promise<Business> {
    const serviceData: Partial<Business> = {
      name,
      slotDuration,
      slotGap,
      maxClientsPerSlot,
    };
    return this.businessService.createService(serviceData);
  }
}
