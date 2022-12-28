import { Component, OnInit } from '@angular/core';

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
      link: '/home'
    },
    {
      title: 'Projects',
      icon: 'folder-outline',
      activedIcon: 'folder',
      link: ''
    },
    {
      title: 'Settings',
      icon: 'settings-2-outline',
      activedIcon: 'settings-2',
      link: ''
    },
  ]

  constructor() { }

  ngOnInit(): void {
    this.selectedMenu = 0;
  }

  selectMenu(index: number) {
    this.selectedMenu = index;
    console.log(this.selectedMenu);
  }

}
