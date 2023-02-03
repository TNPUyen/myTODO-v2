import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

import { NbAutocompleteModule, NbBadgeModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbIconModule, NbSelectModule, NbTagModule, NbTooltipModule } from '@nebular/theme';
import { DropdownMenuComponent } from '../components/dropdown-menu/dropdown-menu.component';
import { FormsModule } from '@angular/forms';

import {DragDropModule} from '@angular/cdk/drag-drop';


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
    NbDatepickerModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbTagModule,
    NbBadgeModule,
  ],
  exports:[
    DropdownMenuComponent,
    SidebarComponent,
    NbCalendarModule,
    NbCheckboxModule,
    NbIconModule,
    NbTooltipModule,
    NbContextMenuModule,
    NbDatepickerModule,
    NbCardModule,
    NbTagModule,
    NbAutocompleteModule,
    NbBadgeModule,
    NbSelectModule,
    FormsModule,

    DragDropModule,
  ]
})
export class SharedModule { }
