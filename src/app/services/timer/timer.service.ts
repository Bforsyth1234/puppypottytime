import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Plugins, LocalNotificationPendingList } from '@capacitor/core';
import { from, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeToPotty: string;
  private storage = Plugins.Storage;
  localNotifications = Plugins.LocalNotifications;
  lastAccident: string;

  constructor() {
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
    this.setNotification(timeToAdd);
    this.storage.set({
      key: 'time',
      value: this.timeToPotty
    })
    .then(() => console.log(this.timeToPotty))
    .catch(err => console.log(err));
  }

  setNotification(timeToAdd: number) {
    from(this.localNotifications.getPending()).subscribe(pendingNotifications => {
      pendingNotifications.notifications.length > 0 ?
        this.removeNotification(timeToAdd, pendingNotifications) : this.setNewNotification(timeToAdd);
    });
  }

  removeNotification(timeToAdd: number, pendingNotifications: LocalNotificationPendingList) {
    from(this.localNotifications.cancel(pendingNotifications)).subscribe(() => {
      this.setNewNotification(timeToAdd);
    });
  }

  setNewNotification(timeToAdd: number) {
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
