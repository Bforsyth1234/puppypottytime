import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnChanges {
  @Input() time: number;

  constructor(
  ) { }

  ngOnChanges() {
    console.log('this.time = ');
    console.log(this.time);
  }
}
