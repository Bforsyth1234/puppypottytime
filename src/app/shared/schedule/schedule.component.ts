import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;

  constructor() {
    this.scheduleForm = new FormGroup({
      wakeUp: new FormControl('', Validators.required),
      breakfast: new FormControl('', Validators.required),
      lunch: new FormControl('', Validators.required),
      dinner: new FormControl('', Validators.required),
      bedTime: new FormControl('', Validators.required),
    });
  }

  ngOnInit() { }

  onSubmit() {
    console.log('this.scheduleForm = ');
    console.log(this.scheduleForm);
  }

}
