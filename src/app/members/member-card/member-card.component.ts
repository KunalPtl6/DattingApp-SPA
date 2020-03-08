import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { LikesService } from 'src/app/_services/likes.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(private likesService: LikesService, public authService: AuthService,
              private alertifyService: AlertifyService, private route: Router) { }

  ngOnInit() {
  }

  SendLike(RecipientId: number) {
    this.likesService.SendLike(this.authService.decodedToken.nameid, RecipientId).subscribe(
      (res) => {
        this.alertifyService.success('You have like: ' + this.user.knownAs);
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
