import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule/schedule';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private storage = Plugins.Storage;

  constructor() { }

  saveSchedule(schedule: Schedule) {
    this.storage.set({
      key: 'schedule',
      value: JSON.stringify(schedule),
    });
  }

  async getSchedule() {
    const scheduleString = await this.storage.get({ key: 'schedule' });
    return JSON.parse(scheduleString.value);
  }
}
