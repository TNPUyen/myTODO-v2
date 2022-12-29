import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';

const routes: Routes = [
  // Routing for authenticated users
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./pages/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'projects/:id',
        loadChildren: () =>
          import(
            './pages/projects/project-detail/project-detail.module'
          ).then((m) => m.ProjectDetailModule),
      },
    ],
  },

  // Routing for unauthenticated users
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
