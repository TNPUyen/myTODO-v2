import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationDialogComponent } from '../invitation-dialog/invitation-dialog.component';
import { NotiDialogComponent } from '../noti-dialog/noti-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedMenu: number = 0;
  sidemenu = [
    {
      title: 'Dashboard',
      icon: 'cube-outline',
      activedIcon: 'dashboard',
      link: '/dashboard',
    },
    {
      title: 'Projects',
      icon: 'briefcase-outline',
      activedIcon: 'folder',
      link: '/project',
    },
    {
      title: 'Settings',
      icon: 'settings-2-outline',
      activedIcon: 'settings-2',
      link: '/setting',
    },
  ];

  sidemenuInfo = [
    {
      title: 'Notifications',
      icon: 'bell-outline',
      activedIcon: 'folder',
      dialog: NotiDialogComponent,
      unRead: '0',
    },
    {
      title: 'Invitations',
      icon: 'person-add-outline',
      activedIcon: 'settings-2',
      dialog: InvitationDialogComponent,
      unRead: '0',
    },
  ]; 
  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sidemenu.find(menu => {
      console.log(this.router.url);

      if (menu.link === this.router.url || this.router.url.includes(menu.link)) {
        this.selectedMenu = this.sidemenu.indexOf(menu);
        console.log(this.selectedMenu);
      }
    })
  }

  selectMenu(index: number) {
    this.selectedMenu = index;
    this.router.navigate([this.sidemenu[index].link]);
  }

}
