import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { FloatingBtnComponent } from './components/floating-btn/floating-btn.component';
import { PersonalTaskComponent } from './components/personal-task/personal-task.component';
import { NewTodoDialogComponent } from './components/new-todo-dialog/new-todo-dialog.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    FloatingBtnComponent,
    PersonalTaskComponent,
    NewTodoDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
