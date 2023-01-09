import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisRoutingModule } from './regis-routing.module';
import { RegisComponent } from './regis.component';


@NgModule({
  declarations: [
    RegisComponent
  ],
  imports: [
    CommonModule,
    RegisRoutingModule
  ]
})
export class RegisModule { }
