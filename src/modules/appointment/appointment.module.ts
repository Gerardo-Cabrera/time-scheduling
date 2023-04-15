import { Module } from '@nestjs/common';
import { AppointmentResolver } from './resolvers/appointment.resolver';
import { AppointmentService } from './services/appointment.service';
import { DateScalar } from './date.scalar';

@Module({
  providers: [AppointmentResolver, AppointmentService, DateScalar],
})
export class AppointmentModule {}
