import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifyCount = 0;

  constructor(private httpService: HttpService, private dataService: DataService) {}

  async fetchNotifications() {
    let apidata = {
      user_token: this.dataService.getUserData(),
      type: "view_notification",
    };

    try {
      const result: any = await this.httpService.postData(apidata, "notifications");
      if (result.Response.status === 1) {
        this.notifyCount = result.Response.notification.filter((notification: any) => notification.is_viewed === 0).length;
        return result.Response.notification;
      } else {
        throw new Error(result.Response.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  getNotifyCount() {
    return this.notifyCount;
  }

  resetNotifyCount() {
    this.notifyCount = 0;
  }

  async updateNotificationStatus(notificationId: number) {
    let apidata = {
      user_token: this.dataService.getUserData(),
      type: "update_status",
      row_id: notificationId
    };

    try {
      const result: any = await this.httpService.postData(apidata, "notifications");
      if (result.Response.status === 1) {
        this.resetNotifyCount();
      } else {
        throw new Error(result.Response.message);
      }
    } catch (error) {
      console.error('Error updating notification status on server:', error);
      throw error;
    }
  }
}
