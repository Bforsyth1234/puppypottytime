import { Component } from '@angular/core';
import { Schedule } from '../models/schedule/schedule';
import { ScheduleService } from '../services/schedule/schedule.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  scheduleData: Schedule;
  constructor(
    public scheduleService: ScheduleService,
  ) {}

  ionViewWillEnter() {
    this.scheduleService.getSchedule().then(data => {
      this.scheduleData = data ? data : null;
    });
  }


  scheduleSubmit(schedule) {
    this.scheduleService.saveSchedule(schedule);
  }
}
