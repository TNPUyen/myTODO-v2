import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

import { NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { DropdownMenuComponent } from '../components/dropdown-menu/dropdown-menu.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DropdownMenuComponent,
    SidebarComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbIconModule,
    NbTooltipModule,
    NbCalendarModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbCardModule,
  ],
  exports:[
    DropdownMenuComponent,
    SidebarComponent,
    NbCalendarModule,
    NbCheckboxModule,
    NbIconModule,
    NbTooltipModule,
    NbContextMenuModule,
    NbCardModule,
    FormsModule
  ]
})
export class SharedModule { }
