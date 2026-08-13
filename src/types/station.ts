export interface Station {
  id: number;
  name: string;
  icon: string;
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
  description: string;
}

export interface Schedule {
  stationId: number;
  stationName: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}
