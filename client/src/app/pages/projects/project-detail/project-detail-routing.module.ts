import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByDateComponent } from './childrens/by-date/by-date.component';
import { ByLabelsComponent } from './childrens/by-labels/by-labels.component';
import { ProjectTaskColComponent } from './childrens/project-task-col/project-task-col.component';
import { ProjectDetailComponent } from './project-detail.component';

const routes: Routes = [
  {
    path: '', component: ProjectDetailComponent,
    children: [
      { path: 'all', component: ProjectTaskColComponent },
      { path: 'label', component: ByLabelsComponent },
      { path: 'date', component: ByDateComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule { }
