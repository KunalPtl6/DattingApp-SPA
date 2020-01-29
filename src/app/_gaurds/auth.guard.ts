import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        }
        this.alertifyService.error('You shall not pass.');
        this.router.navigate(['/home']);
        return false;
    }
}
