import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegistration = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertifyService: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.CreateRegisterForm();
  }

  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      Gender: ['male', Validators.required],
      Username: ['', Validators.required],
      KnownAs: ['', Validators.required],
      DateOfBirth: [null, Validators.required],
      City: ['', Validators.required],
      Country: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: FormGroup) {
    return control.get('Password').value === control.get('confirmPassword').value ? null : { mismatch: true };
  }



  Register() {
    this.user = Object.assign({}, this.registerForm.value);
    if (this.registerForm.valid) {
    this.authService.Register(this.user).subscribe(() => {
      this.alertifyService.success('Registration successfull');
    },
      error => {
        this.alertifyService.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  Cancel() {
    this.cancelRegistration.emit(false);
  }
}
