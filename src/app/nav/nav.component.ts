import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {
    Username: 'Mandy',
    Password: 'password'
  };
  constructor(public authService: AuthService, private alertifyService: AlertifyService,  private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('loggedin succesfully.');
    },
      error => {
        this.alertifyService.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertifyService.message('logout successfully.');
    this.router.navigate(['/home']);
  }

}
