import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable()

export class MemberDetailsResolver implements Resolve<User> {

    constructor(public userService: UserService, private alertifyService: AlertifyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): User | Observable<User> {
        return this.userService.getUser(route.params.id).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retriving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}

