import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectTaskColComponent } from '../components/project-task-col/project-task-col.component';
import { ProjectTaskComponent } from '../components/project-task/project-task.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProjectDetailComponent,
    ProjectTaskColComponent,
    ProjectTaskComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailRoutingModule, 
    SharedModule
  ]
})
export class ProjectDetailModule { }
