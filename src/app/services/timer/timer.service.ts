import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';
import { NotificationService } from '../notification/notification.service';
import { TimerSettings } from '../../models/timer-settings/timer-settings';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeToPotty: string;
  private lastAccident: string;
  private storage = Plugins.Storage;

  constructor(
    public notificationService: NotificationService,
  ) { }

  addAccident() {
    this.lastAccident = new Date(Date.now()).toString();
    this.storage.set({
      key: 'accidentDate',
      value: this.lastAccident
    }).then(() => {
      this.addTime('pottyTimer');
    });
  }

  async getLastAccident(): Promise<string> {
    const data = await this.storage.get({ key: 'accidentDate' });
    return data.value;
  }

  addTime(type: string) {
    this.getTimerSettings()
      .then(timerSettings => {
        if (type === 'pottyTimer') {
          this.setPottyTimer(timerSettings);
        }
        if (type === 'eatingTimer') {
          this.setEatingTimer(timerSettings);
        }
        if (type === 'crateTimer') {
          this.setCrateTimer(timerSettings);
        }
      })
      .catch(err => console.log(err));
  }

  setPottyTimer(timerSettings: TimerSettings) {
    this.notificationService.setNotification(timerSettings.pottyTimer);
    this.storage.set({
      key: 'time',
      value: moment().add(timerSettings.pottyTimer.toString(), 'minutes').toString(),
    })
      .then(() => console.log(this.timeToPotty))
      .catch(err => console.log(err));
  }

  setEatingTimer(timerSettings: TimerSettings) {
    this.notificationService.setNotification(timerSettings.eatingTimer);
    this.storage.set({
      key: 'time',
      value: moment().add(timerSettings.eatingTimer.toString(), 'minutes').toString(),
    })
      .then(() => console.log(this.timeToPotty))
      .catch(err => console.log(err));
  }

  setCrateTimer(timerSettings: TimerSettings) {
    this.notificationService.setNotification(timerSettings.crateTimer);
    this.storage.set({
      key: 'time',
      value: moment().add(timerSettings.crateTimer.toString(), 'minutes').toString(),
    })
      .then(() => console.log(this.timeToPotty))
      .catch(err => console.log(err));
  }

  getTime() {
    return this.storage.get({ key: 'time' }).then(data => {
      return data.value;
    });
  }

  saveTimers(timers: TimerSettings) {
    this.storage.set({
      key: 'timers',
      value: JSON.stringify(timers),
    });
  }

  async getTimerSettings() {
    const timerSettingsString = await this.storage.get({ key: 'timers' });
    return JSON.parse(timerSettingsString.value);
  }
}
