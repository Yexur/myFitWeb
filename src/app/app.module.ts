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

import { ToastService, AuthService, LoadingService, AuthGuard, RoleGuard } from "./app.services/export.app.servies";
import { FitnessClassPageModule } from './fitness-class/fitness-class.module';
import { FitnessClassesCalendarPageModule } from './fitness-classes-calendar/fitness-classes-calendar.module';
import { LookupsPageModule } from './lookups/lookups.module';
import { HomePageModule } from './home/home.module';

@NgModule({
    declarations: [
        AppComponent,
        AccountPopOverComponent,
        FitnessClassMenuComponent
    ],
    entryComponents: [AccountPopOverComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule, //add in enablepersistence when we know how it works
        AngularFirestoreModule,
        FitnessClassPageModule,
        FitnessClassesCalendarPageModule,
        LookupsPageModule,
        HomePageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthGuard,
        RoleGuard,
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
