import { Component } from '@angular/core';
import { Platform, MenuController, Events, PopoverController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ToastService, AuthService } from "./app.services/export.app.servies";
import { AccountPopOverComponent } from './account-pop-over/account-pop-over.component';
import { HomePage } from './home/home.page';
import { FitnessClassesCalendarPage } from './fitness-classes-calendar/fitness-classes-calendar.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    public rootPage: any;
    public adminPages: Array<{title: string, component: any, icon: string}>;
    public nonAdminPages: Array<{title: string, component: any, icon: string}>;
    public nonAdminId = "nonAdmin";
    public adminId = "admin";


    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public events: Events,
        public popoverCtrl: PopoverController,
        public authService: AuthService,
        private menuCtrl: MenuController,
        private toastService: ToastService
    )
    {
        events.subscribe('user:Login', () => {
            if (this.authService.isAdmin()) {
                this.menuCtrl.enable(true, this.adminId);
                this.menuCtrl.enable(false, this.nonAdminId);
            } else {
                this.menuCtrl.enable(false, this.adminId);
                this.menuCtrl.enable(true, this.nonAdminId);
            }

            this.openPage(HomePage);
        });

        events.subscribe('user:LogOut', () => {
            this.menuCtrl.enable(false, this.adminId);
            this.menuCtrl.enable(false, this.nonAdminId);
            this.openPage('LoginPage');
        });

        this.initializeApp();

        this.adminPages = [
            { title: 'Home', component: HomePage, icon: 'home' },
            { title: 'Calendar', component: FitnessClassesCalendarPage, icon: 'calendar' },
            { title: 'My Classes', component: 'RegistrationPage', icon: 'star' },
            { title: 'Manage Attendees', component: 'ManageAttendeesPage', icon: 'people' },
            { title: 'Setup', component: 'LookupsPage', icon: 'cog' }
        ];

        this.nonAdminPages = [
            { title: 'Home', component: HomePage, icon: 'home' },
            { title: 'Calendar', component: FitnessClassesCalendarPage, icon: 'calendar' },
            { title: 'My Classes', component: 'RegistrationPage', icon: 'star' }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        });
    }

    signOut(){
        this.authService.signOut();
    }

    openPage(page: any) {
        this.nav.setRoot(page).then( (result) => {
            if (!result){
                this.toastService.toastUnAuthorized();
            }
        });
    }

    presentAccountPopover(popOverEvent){
        let accountPopOver = this.popoverCtrl.create(AccountPopOverComponent);
        accountPopOver.present({
            ev: popOverEvent
        });
    }

    openMenu(){
        this.menuCtrl.open();
    }

    closeMenu(){
        this.menuCtrl.close();
    }

    toggleMenu(){
        this.menuCtrl.toggle();
    }
}
