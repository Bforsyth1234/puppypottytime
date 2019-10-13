import { Component } from '@angular/core';
import { Schedule } from '../models/schedule/schedule';
import { ScheduleService } from '../services/schedule/schedule.service';
import { TimerSettings } from '../models/timer-settings/timer-settings';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public timerSettingsData: TimerSettings;
  constructor(
    public scheduleService: ScheduleService,
    public timerService: TimerService,
  ) {}

  ionViewWillEnter() {
    this.timerService.getTimerSettings().then(data => {
      console.log('data = ');
      console.log(data);
      this.timerSettingsData = data ? data : null;
    });
  }


  setTimers(timerSettings: TimerSettings) {
    console.log('timerSettings = ');
    console.log(timerSettings);
    this.timerService.saveTimers(timerSettings);
  }
}
