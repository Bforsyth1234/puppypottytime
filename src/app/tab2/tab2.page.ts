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
      console.log('data = ');
      console.log(data);
      if (data) {
        this.scheduleData = data;
      }
    });
  }


  scheduleSubmit(schedule) {
    console.log('scheduleSubmit schedule = ');
    console.log(schedule);
    this.scheduleService.saveSchedule(schedule);
  }
}
