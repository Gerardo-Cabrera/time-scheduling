export class CreateServiceDto {
    name: string;
    appointmentDuration: number;
    breakDuration: number;
    slotDuration: number;
    slotGap: number;
    maxClientsPerSlot: number;
    openingHours: any;
    breakTimes: any;
  }