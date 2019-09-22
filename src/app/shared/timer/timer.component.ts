import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer/timer.service';
import { from } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  time = 8274;

  constructor(
     private timerService: TimerService
  ) { }

  ngOnInit() {
    this.getTime();
  }

  getTime() {
    from(this.timerService.getTime()).subscribe(data => {
      console.log('data = ');
      console.log(data);
      const timeLeft = moment().diff(data, 'seconds');
      console.log('timeLeft = ');
      console.log(timeLeft);
      this.time = (timeLeft * -1);
    });
  }


}
