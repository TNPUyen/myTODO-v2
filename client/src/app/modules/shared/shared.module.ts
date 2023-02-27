import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { NbCalendarModule, NbContextMenuModule, NbTooltipModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbSelectModule, NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditProjectDialogComponent } from '../../pages/project/components/edit-project-dialog/edit-project-dialog.component';

@NgModule({
  declarations: [SidebarComponent,
    EditProjectDialogComponent,
  ],
  imports: [
    CommonModule,

    NbIconModule,
    NbCalendarModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbSelectModule,
    NbContextMenuModule,
    NbCardModule,

    DragDropModule,
    FormsModule,
  ],
  exports: [
    SidebarComponent,

    NbIconModule,
    NbCalendarModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbSelectModule,
    NbContextMenuModule,
    NbTooltipModule,
    DragDropModule,
    NbCardModule,
    EditProjectDialogComponent,

    FormsModule]
})
export class SharedModule { }
