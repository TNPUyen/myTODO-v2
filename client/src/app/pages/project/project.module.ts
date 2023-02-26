import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
  ]
})
export class ProjectModule { }
