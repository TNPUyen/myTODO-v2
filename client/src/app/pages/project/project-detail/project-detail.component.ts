import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  
  selectedTab = 0;

  tabOptions = [
    {
      title: 'Board',
      icon: 'layout-outline',
      link: 'board',
    },
    {
      title: 'List',
      icon: 'pricetags-outline',
      link: 'list',
    },
    {
      title: 'Road map',
      icon: 'calendar-outline',
      link: 'road-map',
    },
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  selectTab(index: number) {
    this.selectedTab = index;
    this.router.navigate([`/project/1/${this.tabOptions[index].link}`])
    // this.router.navigate([`/project/${this.projectInfo.project_id}/${this.tabOptions[index].link}`])
  }

}
