import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
  { path: 'project', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule) }, 
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, 
  { path: 'project-detail', loadChildren: () => import('./pages/project/project-detail/project-detail.module').then(m => m.ProjectDetailModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
