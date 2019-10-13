import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimerSettings } from '../../models/timer-settings/timer-settings';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  @Input() timerSettings: TimerSettings;
  setupForm: FormGroup;

  constructor() {
    this.initForm();
    this.setDefaultTimers();
  }

  initForm() {
    this.setupForm = new FormGroup({
      pottyTimer: new FormControl('', Validators.required),
      eatingTimer: new FormControl('', Validators.required),
      crateTimer: new FormControl('', Validators.required),
    });
  }

  setDefaultTimers() {
    this.setupForm.patchValue({
      pottyTimer: 60,
      eatingTimer: 30,
      crateTimer: 180
    });
  }

  ngOnInit() {
    if (this.timerSettings && this.timerSettings.crateTimer) {
      this.setCustomTimers();
    }
  }

  setCustomTimers() {
    this.setupForm.patchValue({
      pottyTimer: this.timerSettings.pottyTimer,
      eatingTimer: this.timerSettings.eatingTimer,
      crateTimer: this.timerSettings.crateTimer
    });
  }

  onSubmit() {

  }

}
