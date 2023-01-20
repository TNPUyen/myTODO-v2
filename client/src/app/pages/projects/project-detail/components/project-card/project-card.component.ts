import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project!: ProjectModel
  @Input() owner!: User
  @Output() deleteProjectEvent: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();

  constructor(
    private route: Router, 
    private projectService: ProjectService,
    private toastrService: NbToastrService,
    ) { }

  ngOnInit(): void {
    
  }

  deleteProject(project_id: string) {
   if(this.owner.uid === this.project.owner){
    this.projectService.deleteProjectById(project_id).subscribe(
      (res) => {
        this.toastrService.show('Success', res, {
          status: 'success',
        });
      }
    )
    this.deleteProjectEvent.emit(this.project);
   }
  }

  projectDetail(id: string){
    this.route.navigate(['projects', id])
  }

}
