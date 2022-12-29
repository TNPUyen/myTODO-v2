import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  deleteProject() {
    console.log('delete project')
  }

  projectDetail(id: string){
    this.route.navigate(['projects', id])
  }

}
