import { Injectable, NotFoundException } from "@nestjs/common";
import { Appointment } from "src/entities/appointment.entity";
import { Between, Repository } from "typeorm";
import { ServiceService } from "./service.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class AppointmentService {
  constructor(
    private appointmentRepository: Repository<Appointment>,
    private serviceService: ServiceService,
  ) {}

  async createAppointment(
    userId: number,
    serviceId: number,
    startTime: Date,
  ): Promise<Appointment> {
    const user = new User();
    user.id = userId;

    const service = await this.serviceService.findById(serviceId);

    const appointment = new Appointment();
    appointment.user = user;
    appointment.service = service;
    appointment.startTime = startTime;

    return this.appointmentRepository.save(appointment);
  }

  async findAvailableSlots(date: Date, serviceId: number): Promise<Date[]> {
    const service = await this.serviceService.findById(serviceId);
  
    if (!service) {
      throw new NotFoundException('Service not found');
    }
  
    // Initialize the starting and ending hours for the service on the given date
    const openingTime = new Date(date);
    openingTime.setHours(service.startHour);
    openingTime.setMinutes(0);
    openingTime.setSeconds(0);
  
    const closingTime = new Date(date);
    closingTime.setHours(service.endHour);
    closingTime.setMinutes(0);
    closingTime.setSeconds(0);
  
    const availableSlots: Date[] = [];
  
    let slotStart = new Date(openingTime);
  
    while (slotStart < closingTime) {
      // Check if the slotStart is within a break
      let isDuringBreak = false;
      for (const breakTime of service.breakTimes) {
        const breakStart = new Date(date);
        breakStart.setHours(breakTime.startHour);
        breakStart.setMinutes(breakTime.startMinute);
        breakStart.setSeconds(0);
  
        const breakEnd = new Date(date);
        breakEnd.setHours(breakTime.endHour);
        breakEnd.setMinutes(breakTime.endMinute);
        breakEnd.setSeconds(0);
  
        if (slotStart >= breakStart && slotStart < breakEnd) {
          isDuringBreak = true;
          slotStart = new Date(breakEnd);
          break;
        }
      }
  
      if (isDuringBreak) {
        continue;
      }
  
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotStart.getMinutes() + service.slotDuration);
  
      const bookedAppointments = await this.appointmentRepository.find({
        where: {
          startTime: Between(slotStart, slotEnd),
          service: service,
        },
      });
  
      if (bookedAppointments.length < service.maxClientsPerSlot) {
        availableSlots.push(slotStart);
      }
  
      slotStart.setMinutes(slotStart.getMinutes() + service.slotDuration + service.slotGap);
    }
  
    return availableSlots;
  }
  
}