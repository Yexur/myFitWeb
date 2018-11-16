import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountPopOverComponent } from './account-pop-over/account-pop-over.component';
import { FitnessClassMenuComponent } from './fitness-class-menu/fitness-class-menu.component';
import { FIREBASE_CONFIG } from './app.config/app.firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomePage } from './home/home.page';

import {
    AnnouncementService,
    FitnessClassService,
    FitnessClassTemplateService,
    FitnessClassTypeService,
    InstructorService,
    LocationService,
    ManageAttendeesService,
    RegistrationService,
    UserService} from './api.services/export.api';

import { ToastService, AuthService, LoadingService } from "./app.services/export.app.servies";
//import { NgCalendarModule } from 'ionic2-calendar'; this needs to be replaced
import { FitnessClassesCalendarPage } from './fitness-classes-calendar/fitness-classes-calendar.page';

@NgModule({
    declarations: [
        AppComponent,
        AccountPopOverComponent,
        FitnessClassMenuComponent,
        FitnessClassesCalendarPage,
        HomePage],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence()],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AnnouncementService,
        FitnessClassService,
        FitnessClassTemplateService,
        FitnessClassTypeService,
        InstructorService,
        LocationService,
        ManageAttendeesService,
        RegistrationService,
        UserService,
        ToastService,
        AuthService,
        LoadingService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
