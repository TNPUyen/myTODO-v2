import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTaskColComponent } from './components/project-task-col/project-task-col.component';
import { ProjectDetailComponent } from './project-detail.component';

const routes: Routes = [
  { path: '', component: ProjectDetailComponent, 
    children: [
      {path: 'all', component: ProjectTaskColComponent},
      {path: 'label', component: ProjectTaskColComponent},
      {path: 'date', component: ProjectTaskColComponent}
    ]
   }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule { }
