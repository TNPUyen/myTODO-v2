import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloatingBtnComponent } from './components/floating-btn/floating-btn.component';
import { PersonalTaskComponent } from './components/personal-task/personal-task.component';


@NgModule({
  declarations: [
    HomeComponent,
    FloatingBtnComponent,
    PersonalTaskComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
