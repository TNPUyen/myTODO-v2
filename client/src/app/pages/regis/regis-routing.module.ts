import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisComponent } from './regis.component';

const routes: Routes = [{ path: '', component: RegisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisRoutingModule { }
