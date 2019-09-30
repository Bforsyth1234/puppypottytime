import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeToPotty: string;
  private storage = Plugins.Storage;
  localNotifications = Plugins.LocalNotifications;
  lastAccident;


  constructor() {
  }

  addAccident() {
    this.lastAccident =  new Date(Date.now());
    this.storage.set({
      key: 'accidentDate',
      value: this.lastAccident
    });
  }

  async getLastAccident(): Promise<string>   {
    const data = await this.storage.get({ key: 'accidentDate' });
    console.log('data getLastAccident = ');
    console.log(data);
    return data.value;
  }

  add(timeToAdd: number) {
    this.timeToPotty = moment().add(timeToAdd.toString(), 'minutes').toString();
    this.setNotification(timeToAdd);
    this.storage.set({
      key: 'time',
      value: this.timeToPotty
    })
    .then(() => console.log(this.timeToPotty))
    .catch(err => console.log(err));
  }

  setNotification(timeToAdd: number) {
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
      return data.value;
    });
  }
}
