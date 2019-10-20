import { Component } from '@angular/core';
import { TimerService } from '../services/timer/timer.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public time = 1;
  public daysSinceLastAccident: number;

  constructor(
    private timerService: TimerService,
    private notificationService: NotificationService,
  ) {
    this.getLastAccident();
    this.getInitTime();
  }

  getLastAccident() {
    from(this.timerService.getLastAccident()).subscribe(data => {
      this.calculateLastAccident(data);
    });
  }

  calculateLastAccident(lastAccidentDate: string) {
    this.daysSinceLastAccident = moment().diff(lastAccidentDate, 'seconds');
  }

  onAddAccident() {
    this.timerService.addAccident();
    this.getLastAccident();
    this.addHourToTimer();
  }

  onAddSuccess() {
    this.addHourToTimer();
  }

  addHourToTimer() {
    this.timerService.addTime('pottyTimer').then(data => {
      if (data) {
        this.setTime(data);
      }
    });
  }

  getInitTime() {
    from(this.timerService.getTime()).subscribe(data => {
      this.setTime(data);
    });
  }

  setTime(timeData: string) {
    this.time = 0;
    const timeLeft = moment().diff(timeData, 'seconds');
    this.time = (timeLeft * -1);
    setTimeout(() => {
      if (this.time > 0) {
        this.time--;
        this.time.toLocaleString();
      }
    }, 1000);
  }

  onAddFeedingTimer() {
    this.timerService.addTime('eatingTimer').then(data => {
      if (data) {
        this.setTime(data);
      }
    });
  }

  onSetCrateTime() {
    this.timerService.addTime('crateTimer').then(data => {
      if (data) {
        this.setTime(data);
      }
    });
  }

  onSetBedTime() {
    this.notificationService.removeAllNotifications();
  }
}
