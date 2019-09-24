import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeToPotty;
  storage = Plugins.Storage;
  localNotifications = Plugins.LocalNotifications;
  subject = new Subject<number>();


  constructor() {
  }

  add(timeToAdd: number) {
    this.timeToPotty = moment().add(timeToAdd.toString(), 'minutes').toString();
    this.subject.next(this.timeToPotty);
    this.setNotification(timeToAdd);
    return this.storage.set({
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
