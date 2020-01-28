import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegistration = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  Register() {
    this.authService.Register(this.model).subscribe(() => {
      this.alertifyService.success('Registration successfull');
    },
      error => {
        this.alertifyService.error(error);
      });
  }

  Cancel() {
    this.cancelRegistration.emit(false);
  }
}
