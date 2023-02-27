import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetailComponent } from './project-detail.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { RoadMapComponent } from './components/road-map/road-map.component';


@NgModule({
  declarations: [
    ProjectDetailComponent,
    BoardComponent,
    ListComponent,
    RoadMapComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailRoutingModule,

    SharedModule
  ]
})
export class ProjectDetailModule { }
