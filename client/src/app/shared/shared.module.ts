import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

import { NbCalendarModule, NbCheckboxModule, NbIconModule, NbTooltipModule } from '@nebular/theme';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    NbTooltipModule,
    NbCalendarModule,
    NbCheckboxModule,
  ],
  exports:[
    SidebarComponent,
    NbCalendarModule,
    NbCheckboxModule,
    NbIconModule,
    NbTooltipModule,
  ]
})
export class SharedModule { }
