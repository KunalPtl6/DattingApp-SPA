import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {
      Username: 'Gaurav',
      Password: 'Gaurav123'
  };
  constructor(private authServie: AuthService) { }

  ngOnInit() {
  }

  Login() {
    this.authServie.login(this.model).subscribe(next => {
      console.log('you are loggedin');
    },
      error => {
        console.log('Faild to loggedin');
      });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    localStorage.removeItem('token');
    console.log('you are logged Out');
  }

}
