import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  constructor(private userService: UserService, private alertifyService: AlertifyService,
              public authService: AuthService, private route: ActivatedRoute) { }
 @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  ngOnInit() {
    this.GetUser();
  }

  GetUser() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    });
  }

  UpdateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.editForm.value).subscribe(next => {
      this.GetUser();
      this.alertifyService.success('Update user succesfully.');
    },
      error => {
        this.alertifyService.error(error);
      });
  }

  UpdateMemberPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }

}
