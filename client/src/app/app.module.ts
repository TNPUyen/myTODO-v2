import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotiDialogComponent } from './components/noti-dialog/noti-dialog.component';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NotiDialogComponent,
    InvitationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
