import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeToPotty: string;
  private storage = Plugins.Storage;
  localNotifications = Plugins.LocalNotifications;
  subject = new Subject<string>();
  accidentSubject = new Subject<string>();
  lastAccident;


  constructor() {
  }

  addAccident() {
    this.lastAccident =  new Date(Date.now());
    this.accidentSubject.next(this.lastAccident.value);
    console.log('this.lastAccident = ');
    console.log(this.lastAccident);
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
    console.log('ran 1');
    console.log('this.timeToPotty = ');
    console.log(this.timeToPotty);
    this.subject.next(this.timeToPotty);
    this.setNotification(timeToAdd);
    return this.storage.set({
      key: 'time',
      value: this.timeToPotty
    });
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
      console.log('data = ');
      console.log(data);
      return data.value;
    });
  }
}
