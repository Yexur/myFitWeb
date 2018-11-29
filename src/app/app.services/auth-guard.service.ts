import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService) {
    }

    //this needs to be fixed to use router gaurds for read and write access for users vs admins

    canActivate(): boolean {
        return this.authService.isAuthenticated();
    }

    canActivateChild(): boolean {  //turn this into role based
        return (this.authService.isAdmin() && this.authService.isAuthenticated());
    }
}