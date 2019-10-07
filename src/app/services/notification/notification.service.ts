import { Injectable } from '@angular/core';
import { Plugins, LocalNotificationPendingList } from '@capacitor/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  timeToPotty: string;
  localNotifications = Plugins.LocalNotifications;
  lastAccident: string;

  constructor() { }

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

  removeAllNotifications() {
    from(this.localNotifications.getPending()).subscribe(pendingNotifications => {
      this.localNotifications.cancel(pendingNotifications)
        .then(() => console.log('canceled all notifications'))
        .catch(err => console.log(err));
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

}
