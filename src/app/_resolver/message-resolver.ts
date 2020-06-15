import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import {Message} from '../_models/Message';

@Injectable()

export class MessageResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    constructor(public message: MessageService, private alertifyService: AlertifyService, private router: Router,
                public authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot): Message[] | Observable<Message[]> {
        return this.message.getMesage(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retriving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}

