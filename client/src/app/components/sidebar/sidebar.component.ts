import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedMenu: any;
  sidemenu = [
    {
      title: 'Home',
      icon: 'home-outline',
      activedIcon: 'home',
      link: ''
    },
    {
      title: 'Projects',
      icon: 'folder-outline',
      activedIcon: 'folder',
      link: '/projects'
    },
    {
      title: 'Settings',
      icon: 'settings-2-outline',
      activedIcon: 'settings-2',
      link: ''
    },
  ]

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.selectedMenu = 0;
  }

  selectMenu(index: number) {
    this.selectedMenu = index;
    this.route.navigate([this.sidemenu[index].link]);
  }

}
