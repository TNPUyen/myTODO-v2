import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';

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
      link: '',
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

  constructor(
    private route: Router,
    private authService: AuthService,
    private toastrService: NbToastrService
  ) {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.selectedMenu = 0;
  }

  selectMenu(index: number) {
    this.selectedMenu = index;
    this.route.navigate([this.sidemenu[index].link]);
  }

  logout() {
    this.authService.logout().subscribe((status) => {
      this.toastrService.show(status || 'Success', 'Logout successfully!!', { status: 'success' });
      this.route.navigate(['/login']);
    });
    localStorage.removeItem('user');
  }
}
