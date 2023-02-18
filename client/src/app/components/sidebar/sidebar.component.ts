import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { InvitationDialogComponent } from '../invitation-dialog/invitation-dialog.component';
import { NotiDialogComponent } from '../noti-dialog/noti-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user!: User | null;
  selectedMenu: any;
  sidemenu = [
    {
      title: 'Home',
      icon: 'home-outline',
      activedIcon: 'home',
      link: '/',
    },
    {
      title: 'Projects',
      icon: 'folder-outline',
      activedIcon: 'folder',
      link: '/projects',
    },
    {
      title: 'Settings',
      icon: 'settings-2-outline',
      activedIcon: 'settings-2',
      link: '/settings',
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

  constructor(
    private route: Router,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private invitationService: InvitationService,
    private activedRoute: ActivatedRoute, 
  ) {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.sidemenuInfo[1].unRead = this.invitationService.countUnReadInvitations.toString();
    this.sidemenu.find(menu => {
      if (menu.link === this.route.url || this.route.url.includes(menu.link)) {
        this.selectedMenu = this.sidemenu.indexOf(menu);
      }
    })
  }

  selectMenu(index: number) {
    this.selectedMenu = index;
    this.route.navigate([this.sidemenu[index].link]);
  }

  openDialog(dialog: any) {
    this.dialogService.open(dialog);
    this.invitationService.invitations.forEach(invitation => {
      if(invitation.unread){

        invitation = {...invitation, unread: false};
        console.log(invitation);

        this.invitationService.updateInvitationById(invitation.id, invitation);
      }
      this.invitationService.countUnReadInvitations = 0;

    });
  }

  logout() {
    this.authService.logout().subscribe((status) => {
      this.toastrService.show(status || 'Success', 'Logout successfully!!', { status: 'success' });
      this.route.navigate(['/login']);
    });
    localStorage.removeItem('user');
  }
}
