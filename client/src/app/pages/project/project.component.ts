import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  isSharedProjects: string = '0';


  constructor() { }

  ngOnInit(): void {
  }

  filterProjects(event: string) {
    if (event === '0') {
      // if(this.ownedProjects != null){
      //   this.projectRendered = this.ownedProjects;
      // }else{
      //   this.projectRendered = [];
      // }
    } else {
      // if(this.sharedProjects != null){
      //   this.projectRendered = this.sharedProjects;
      // }else{
      //   this.projectRendered = [];
      // }
    }
  }

}
