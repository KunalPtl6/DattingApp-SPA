import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {
    Username: 'gaurav',
    Password: 'gaurav7'
  };
  constructor(public authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('loggedin succesfully.');
    },
      error => {
        this.alertifyService.error(error);
      });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertifyService.message('loggedout successfully.');
  }

}
