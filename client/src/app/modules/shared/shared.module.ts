import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { NbCalendarModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent,],
  imports: [
    CommonModule,

    NbIconModule,
    NbCalendarModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbSelectModule,

    FormsModule,
  ],
  exports: [
    SidebarComponent, 

    NbIconModule, 
    NbCalendarModule,
    NbDatepickerModule, 
    NbCheckboxModule,
    NbSelectModule, 
    
    FormsModule]
})
export class SharedModule { }
