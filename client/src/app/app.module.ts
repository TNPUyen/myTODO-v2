import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './modules/shared/shared.module';
import { NotiDialogComponent } from './components/noti-dialog/noti-dialog.component';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule, NbMenuModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
// import { EditTaskProjectDialogComponent } from './components/edit-task-project-dialog/edit-task-project-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NotiDialogComponent,
    InvitationDialogComponent,
    // EditTaskProjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    SharedModule,

    BrowserAnimationsModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbDialogModule.forChild(),

    NbLayoutModule,

    NbEvaIconsModule,
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
