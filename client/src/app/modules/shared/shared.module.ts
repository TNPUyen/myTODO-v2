import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { NbCalendarModule, NbContextMenuModule, NbTooltipModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbSelectModule, NbCardModule, NbInputModule, NbTagModule, NbAutocompleteModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditProjectDialogComponent } from '../../pages/project/components/edit-project-dialog/edit-project-dialog.component';
import { EditTaskProjectDialogComponent } from 'src/app/pages/project/components/edit-task-project-dialog/edit-task-project-dialog.component';

@NgModule({
  declarations: [SidebarComponent,
    EditProjectDialogComponent,
    EditTaskProjectDialogComponent,
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
    NbInputModule,
    NbTagModule,
    NbAutocompleteModule,

    DragDropModule,
    FormsModule,
  ],
  exports: [
    SidebarComponent,
    EditTaskProjectDialogComponent,
    EditTaskProjectDialogComponent,

    NbIconModule,
    NbCalendarModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbSelectModule,
    NbContextMenuModule,
    NbTooltipModule,
    DragDropModule,
    NbCardModule,
    NbInputModule,
    NbTagModule,
    NbAutocompleteModule,

    FormsModule]
})
export class SharedModule { }
