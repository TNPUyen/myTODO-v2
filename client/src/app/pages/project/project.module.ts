import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EditProjectDialogComponent } from './components/edit-project-dialog/edit-project-dialog.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCardComponent,
    EditProjectDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
  ]
})
export class ProjectModule { }
