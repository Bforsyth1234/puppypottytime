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
  ) {
  }

  addAccident() {
    this.lastAccident =  new Date(Date.now()).toString();
    this.storage.set({
      key: 'accidentDate',
      value: this.lastAccident
    });
  }

  async getLastAccident(): Promise<string>   {
    const data = await this.storage.get({ key: 'accidentDate' });
    return data.value;
  }

  add(timeToAdd: number) {
    this.timeToPotty = moment().add(timeToAdd.toString(), 'minutes').toString();
    this.notificationService.setNotification(timeToAdd);
    this.storage.set({
      key: 'time',
      value: this.timeToPotty
    })
    .then(() => console.log(this.timeToPotty))
    .catch(err => console.log(err));
  }

  getTime() {
    return this.storage.get({key: 'time'}).then(data => {
      return data.value;
    });
  }

  saveTimers(timers: TimerSettings) {
    console.log('timers from saveTimers service = ');
    console.log(timers);
    this.storage.set({
      key: 'timers',
      value: JSON.stringify(timers),
    });
  }

  async getTimerSettings() {
    const timerSettingsString = await this.storage.get({ key: 'timers' });
    console.log('JSON.parse(timerSettingsString.value) = ');
    console.log(JSON.parse(timerSettingsString.value));
    return JSON.parse(timerSettingsString.value);
  }
}
