import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  // Routing for authenticated users
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [HomeGuard],
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
          import('./pages/projects/project-detail/project-detail.module').then(
            (m) => m.ProjectDetailModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },

  // Routing for unauthenticated users
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'regis',
    loadChildren: () =>
      import('./pages/regis/regis.module').then((m) => m.RegisModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
