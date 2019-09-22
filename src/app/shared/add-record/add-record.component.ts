import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer/timer.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit {

  constructor(
    private timerService: TimerService,
  ) { }

  ngOnInit() {}

  addRecord(type: string) {
    type === 'accident' ? this.accident() : this.success();
  }

  accident() {
    this.addHourToTimer();
  }

  success() {
    this.addHourToTimer();
  }

  addHourToTimer() {
    from(this.timerService.add(60)).subscribe(data => {
      console.log('data = ');
      console.log(data);
    });
  }

}
