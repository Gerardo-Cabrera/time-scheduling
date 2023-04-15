import { Query } from "@nestjs/common";
import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { Appointment } from "src/entities/appointment.entity";
import { AppointmentService } from "../services/appointment.service";
import { DateScalar } from "../date.scalar";
import { AvailableSlotDto } from "../dto/available-slot.dto";

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('startTime', { type: () => Date }) startTime: Date,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(userId, serviceId, startTime);
  }

  @Query(() => [AvailableSlotDto])
  async AvailableSlotDto(
    @Args('date', { type: () => Date }) date: Date,
    @Args('serviceId', { type: () => Int }) serviceId: number,
  ): Promise<Date[]> {
    return this.appointmentService.findAvailableSlots(date, serviceId);
  }
}