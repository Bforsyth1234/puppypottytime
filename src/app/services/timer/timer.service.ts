import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';
import { NotificationService } from '../notification/notification.service';
import { TimerSettings } from '../../models/timer-settings/timer-settings';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
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
    });
  }

  async getLastAccident(): Promise<string> {
    const data = await this.storage.get({ key: 'accidentDate' });
    return data.value;
  }

  async addTime(type: string): Promise<string | void> {
     return await this.getTimerSettings()
      .then(timerSettings => {
        if (type === 'pottyTimer') {
          return this.setPottyTimer(timerSettings);
        }
        if (type === 'eatingTimer') {
          return this.setEatingTimer(timerSettings);
        }
        if (type === 'crateTimer') {
          return this.setCrateTimer(timerSettings);
        }
      })
      .catch(err => console.log(err));
  }

  setPottyTimer(timerSettings: TimerSettings): string {
    this.notificationService.setNotification(timerSettings.pottyTimer);
    this.storage.set({
      key: 'time',
      value: moment().add(timerSettings.pottyTimer.toString(), 'minutes').toString(),
    })
      .then(() => console.log(timerSettings))
      .catch(err => console.log(err));
    return  moment().add(timerSettings.pottyTimer.toString(), 'minutes').toString();
  }

  setEatingTimer(timerSettings: TimerSettings): string {
    this.notificationService.setNotification(timerSettings.eatingTimer);
    this.storage.set({
      key: 'time',
      value: moment().add(timerSettings.eatingTimer.toString(), 'minutes').toString(),
    })
      .then(() => console.log(timerSettings))
      .catch(err => console.log(err));
    return  moment().add(timerSettings.eatingTimer.toString(), 'minutes').toString();
  }

  setCrateTimer(timerSettings: TimerSettings): string {
    this.notificationService.setNotification(timerSettings.crateTimer);
    this.storage.set({
      key: 'time',
      value: moment().add(timerSettings.crateTimer.toString(), 'minutes').toString(),
    })
      .then(() => console.log(timerSettings))
      .catch(err => console.log(err));
    return  moment().add(timerSettings.crateTimer.toString(), 'minutes').toString();
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

  async getTimerSettings(): Promise<TimerSettings> {
    const timerSettingsString = await this.storage.get({ key: 'timers' });
    return JSON.parse(timerSettingsString.value);
  }
}
