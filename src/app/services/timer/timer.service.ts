import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeToPotty: string;
  private storage = Plugins.Storage;
  localNotifications = Plugins.LocalNotifications;
  lastAccident: string;

  constructor(
    public notificationService: NotificationService
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
}
