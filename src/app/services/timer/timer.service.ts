import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeToPotty: string;
  storage = Plugins.Storage;
  localNotifications = Plugins.LocalNotifications;

  constructor() {
  }

  async add(timeToAdd: number) {
    this.timeToPotty = moment().add(timeToAdd.toString(), 'minutes').toString();
    this.setNotification(timeToAdd);
    await this.storage.set({
      key: 'time',
      value: this.timeToPotty
    });
  }

  setNotification(timeToAdd: number) {
    console.log('timeToAdd = ');
    console.log(timeToAdd);
    this.localNotifications.schedule({
      notifications: [
        {
          title: 'Puppy Potty Time',
          body: 'Body',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * timeToAdd) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  getTime() {
    return this.storage.get({key: 'time'}).then(data => {
      console.log('data = ');
      console.log(data);
      return data.value;
    });
  }
}
