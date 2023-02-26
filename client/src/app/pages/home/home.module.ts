import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TodoComponent } from './components/todo/todo.component';
import { PersonalComponent } from './components/personal/personal.component';
import { OfficialComponent } from './components/official/official.component';


@NgModule({
  declarations: [
    HomeComponent,
    TodoComponent,
    PersonalComponent,
    OfficialComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
