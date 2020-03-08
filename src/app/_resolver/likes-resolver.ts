import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { LikesService } from '../_services/likes.service';
import { AuthService } from '../_services/auth.service';

@Injectable()

export class LikesResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(public likeService: LikesService, private authService: AuthService,
                private alertifyService: AlertifyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): User[] | Observable<User[]> {
        return this.likeService.UserLikerList(this.pageNumber, this.pageSize, this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retriving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}

