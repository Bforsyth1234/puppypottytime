import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer/timer.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-accident-data',
  templateUrl: './accident-data.component.html',
  styleUrls: ['./accident-data.component.scss'],
})
export class AccidentDataComponent implements OnInit {

  daysSinceLastAccident;
  accidentSub: Subject<string>;

  constructor(
    private timerService: TimerService,
  ) { }

  ngOnInit() {
    this.getLastAccident();
  }

  getLastAccident() {
    this.timerService.getLastAccident().then(data => {
      this.calculateLastAccident(data);
    });
  }

  calculateLastAccident(lastAccidentDate: string) {
    this.daysSinceLastAccident = moment().diff(lastAccidentDate, 'seconds');
  }

}
