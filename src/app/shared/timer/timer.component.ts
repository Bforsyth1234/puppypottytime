import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer/timer.service';
import { from, Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  time = 1;
  timerSub: Subject<string>;

  constructor(
     private timerService: TimerService
  ) { }

  ngOnInit() {
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

  setTime(timeData) {
    const timeLeft = moment().diff(timeData, 'seconds');
    this.time = (timeLeft * -1);
  }
}
