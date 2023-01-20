import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotiService {
  private apiUrl = environment.apiUrl+"/notifications";

  constructor(private http: HttpClient) { }

  getNotis(){
    return this.http.get(`${this.apiUrl}/all`) as Observable<NotificationModel[]>;
  }

  getNoti(noti_id: string | null){
    return this.http.get(`${this.apiUrl}/${noti_id}`) as Observable<NotificationModel[]>;
  }

  getNotisByUserId(uid: string){
    return this.http.get(`${this.apiUrl}/byUser/${uid}`) as Observable<NotificationModel[]>;
  }

  getNotisByProjectId(project_id: string){
    return this.http.get(`${this.apiUrl}/project/${project_id}`)  as Observable<NotificationModel[]>;
  }

  createNoti(newNoti: any) {
    return this.http.post(`${this.apiUrl}`, newNoti) as Observable<NotificationModel>;
  }

  updateNotiById(noti_id: string, updatedNoti: any) {
    return this.http.put(`${this.apiUrl}/${noti_id}`, updatedNoti)  as Observable<NotificationModel>;
  }

  deleteNotiById(noti_id: string) {
    return this.http.delete(`${this.apiUrl}/${noti_id}`) as Observable<string>;
  }
}
