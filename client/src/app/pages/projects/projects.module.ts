import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectCardComponent } from './project-detail/components/project-card/project-card.component';
import { NewProjectDialogComponent } from './components/new-project-dialog/new-project-dialog.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
    NewProjectDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
