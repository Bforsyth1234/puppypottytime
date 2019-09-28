import { Component } from '@angular/core';
import { TimerService } from '../services/timer/timer.service';
import * as moment from 'moment';
import { from, Subject } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public time = 1;
  public daysSinceLastAccident: number;
  timerSub: Subject<string>;
  


  constructor(
    private timerService: TimerService
  ) {
    this.getLastAccident();
    this.initTime();
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
    this.addHourToTimer();
    this.timerService.addAccident();
    this.getLastAccident();
  }

  onAddSuccess() {
    this.addHourToTimer();
  }

  addHourToTimer() {
    from(this.timerService.add(60)).subscribe(data => {
      console.log('data = ');
      console.log(data);
    });
  }

  initTime() {
    this.getInitTime();
    this.timerSub = this.timerService.subject;
    this.timerSub.subscribe(data => {
      console.log('data = ');
      console.log(data);
      this.setTime(data);
    });
  }

  getInitTime() {
    from(this.timerService.getTime()).subscribe(data => {
      console.log('data = ');
      console.log(data);
      this.setTime(data);
    });
  }

  setTime(timeData: string) {
    const timeLeft = moment().diff(timeData, 'seconds');
    console.log('timeLeft = ');
    console.log(timeLeft);
    this.time = (timeLeft * -1);
  }

}
