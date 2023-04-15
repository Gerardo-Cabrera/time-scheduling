import { EntityRepository, Repository } from 'typeorm';
import { Service } from '../../../entities/service.entity';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
    async findOneWithOpeningHours(serviceId: number): Promise<Service | undefined> {
        return this.findOne(serviceId);
    }
}
