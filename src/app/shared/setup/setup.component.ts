import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimerSettings } from '../../models/timer-settings/timer-settings';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  @Output() setTimers: EventEmitter<TimerSettings> = new EventEmitter();
  @Input() timerSettingsData: TimerSettings;
  setupForm: FormGroup;

  constructor() {
    this.initForm();
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
    if (this.timerSettingsData && this.timerSettingsData.crateTimer) {
      this.setCustomTimers();
    } else {
      this.setDefaultTimers();
    }
  }

  setCustomTimers() {
    this.setupForm.patchValue({
      pottyTimer: this.timerSettingsData.pottyTimer,
      eatingTimer: this.timerSettingsData.eatingTimer,
      crateTimer: this.timerSettingsData.crateTimer
    });
  }

  onSubmit() {
    this.setTimers.emit(this.setupForm.value);
  }

}
