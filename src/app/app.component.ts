import { Component } from '@angular/core';
import { Platform, MenuController, Events, PopoverController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from "./app.services/export.app.servies";
import { AccountPopOverComponent } from './account-pop-over/account-pop-over.component';
import { Router } from '@angular/router';


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
        private router: Router
    )
    {
        this.adminPages = [
            { title: 'Home', component: '/home', icon: 'home' },
            { title: 'Calendar', component: '/fitness-classes-calendar', icon: 'calendar' },
            { title: 'My Classes', component: '/registration', icon: 'star' },
            { title: 'Manage Attendees', component: '/manage-attendees', icon: 'people' },
            { title: 'Setup', component: '/lookups', icon: 'cog' }
        ];

        this.nonAdminPages = [
            { title: 'Home', component: '/home', icon: 'home' },
            { title: 'Calendar', component: '/fitness-classes-calendar', icon: 'calendar' },
            { title: 'My Classes', component: '/registration', icon: 'star' }
        ];

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        });

        this.authService.authenticationState.subscribe(state => {
            if(state){
                this.openPage('/home');
                if (this.authService.isAdmin()) {
                    this.menuCtrl.enable(true, this.adminId);
                    this.menuCtrl.enable(false, this.nonAdminId);
                } else {
                    this.menuCtrl.enable(false, this.adminId);
                    this.menuCtrl.enable(true, this.nonAdminId);
                }
            }
            else{
                this.menuCtrl.enable(false, this.adminId);
                this.menuCtrl.enable(false, this.nonAdminId);
                this.openPage('/login');
            }
        });
    }

    signOut(){
        this.authService.signOut();
    }

    openPage(page: string) {
        this.router.navigateByUrl(page);
    }

    async presentAccountPopover(popOverEvent){
        const accountPopOver = await this.popoverCtrl.create({
            component: AccountPopOverComponent,
            event: popOverEvent
        });
        await accountPopOver.present();
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
