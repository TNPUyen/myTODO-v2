import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetailComponent } from './project-detail.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { RoadMapComponent } from './components/road-map/road-map.component';
import { BoardTaskCardComponent } from './components/board/components/board-task-card/board-task-card.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ProjectDetailComponent,
    BoardComponent,
    ListComponent,
    RoadMapComponent,
    BoardTaskCardComponent,
  ],
  imports: [
    CommonModule,
    ProjectDetailRoutingModule,
    NbCardModule,

    SharedModule
  ]
})
export class ProjectDetailModule { }
