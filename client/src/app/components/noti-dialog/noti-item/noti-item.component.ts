import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification.model';

@Component({
  selector: 'app-noti-item',
  templateUrl: './noti-item.component.html',
  styleUrls: ['./noti-item.component.scss']
})
export class NotiItemComponent implements OnInit {

  @Input() noti!: NotificationModel;

  constructor() { }

  ngOnInit(): void {
  }

}
