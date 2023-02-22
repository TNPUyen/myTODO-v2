import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbToastrModule, NbDialogModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from './shared/shared.module';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NotiDialogComponent } from './components/noti-dialog/noti-dialog.component';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';
import { InvitationItemComponent } from './components/invitation-dialog/invitation-item/invitation-item.component';
import { NotiItemComponent } from './components/noti-dialog/noti-item/noti-item.component';
import { CalendarComponent } from './utils/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    NotiDialogComponent,
    InvitationDialogComponent,
    InvitationItemComponent,
    NotiItemComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,    
    NbMenuModule.forRoot(),    
    NbToastrModule.forRoot(),
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
