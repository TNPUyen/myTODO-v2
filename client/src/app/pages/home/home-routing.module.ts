import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficialComponent } from './components/official/official.component';
import { PersonalComponent } from './components/personal/personal.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, children: [
  { path: 'personal', component: PersonalComponent },
  { path: '', redirectTo: 'personal', pathMatch: 'full'},
  { path: 'official', component: OfficialComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
