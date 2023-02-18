import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectTaskColComponent } from './childrens/project-task-col/project-task-col.component';
import { ProjectTaskComponent } from './childrens/project-task-col/components/project-task/project-task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';
import { ShareProjectDialogComponent } from './components/share-project-dialog/share-project-dialog.component';
import { ProjectInfoDialogComponent } from './components/project-info-dialog/project-info-dialog.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { ByLabelsComponent } from './childrens/by-labels/by-labels.component';
import { ByDateComponent } from './childrens/by-date/by-date.component';


@NgModule({
  declarations: [
    ProjectDetailComponent,
    ProjectTaskColComponent,
    ProjectTaskComponent,
    NewTaskDialogComponent,
    ShareProjectDialogComponent,
    ProjectInfoDialogComponent,
    TaskEditComponent,
    ByLabelsComponent,
    ByDateComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailRoutingModule,
    SharedModule
  ]
})
export class ProjectDetailModule { }
