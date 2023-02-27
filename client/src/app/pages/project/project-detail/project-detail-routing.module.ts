import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { RoadMapComponent } from './components/road-map/road-map.component';
import { ProjectDetailComponent } from './project-detail.component';

const routes: Routes = [
  { path: '', component: ProjectDetailComponent, 
  children: [
    { path: 'board', component: BoardComponent },
    { path: 'list', component: ListComponent },
    { path: 'road-map', component: RoadMapComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule { }
