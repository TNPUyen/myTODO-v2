import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NbDialogRef } from '@nebular/theme';
import { NotificationModel } from 'src/app/models/notification.model';
import { NotiService } from 'src/app/services/noti/noti.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-noti-dialog',
  templateUrl: './noti-dialog.component.html',
  styleUrls: ['./noti-dialog.component.scss']
})
export class NotiDialogComponent implements OnInit {
  notis: NotificationModel[] = [];
  // user!: User;

  constructor(
    public ref: NbDialogRef<NotiDialogComponent>,
    private notificationService: NotiService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.notificationService.getNotisByUserId(this.userService.user.uid).subscribe(notifications => {
      if(notifications) {
        this.notis = notifications.reverse();
      }else{
        this.notis = [];
      }
    });
  }

}
