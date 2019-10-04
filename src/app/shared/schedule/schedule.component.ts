import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { Schedule } from '../../models/schedule/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @Output() scheduleSubmit: EventEmitter<Schedule> = new EventEmitter();
  @Input() scheduleData: Schedule;
  scheduleForm: FormGroup;

  constructor(
    public scheduleService: ScheduleService,
  ) {
    this.scheduleForm = new FormGroup({
      wakeUp: new FormControl('', Validators.required),
      breakfast: new FormControl('', Validators.required),
      lunch: new FormControl('', Validators.required),
      dinner: new FormControl('', Validators.required),
      bedTime: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (this.scheduleData) {
      this.scheduleForm.setValue(this.scheduleData);
    }
  }

  onSubmit() {
    this.scheduleSubmit.emit(this.scheduleForm.value);
  }



}
