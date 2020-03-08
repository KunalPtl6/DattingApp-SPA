import { Component, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from '../_models/Pagination';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: any = 'Likers';
  constructor(public likeService: LikesService, public authService: AuthService, private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
  }

  pageChange(event: any) {
    this.pagination.currentPage = event.page;
    if (this.likesParam === 'Likers') {
      this.UserLikeeList();
    } else {
      this.UserLikerList();
    }
  }

  UserLikeeList() {
    this.likeService.UserLikerList(this.pagination.currentPage, this.pagination.itemsPerPages,
      this.authService.decodedToken.nameid).subscribe(
      (res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertifyService.error(error);
      });
  }

  UserLikerList() {
    this.likeService.UserLikeeList(this.pagination.currentPage, this.pagination.itemsPerPages,
      this.authService.decodedToken.nameid).subscribe(
      (res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertifyService.error(error);
      });
  }

  RemoveLikes(RecipientId: number, KnownAs: string) {
    this.likeService.RemoveLikes(this.authService.decodedToken.nameid, RecipientId).subscribe(
      (res) => {
        const index = this.users.findIndex(x => x.id === RecipientId);
        if (index != null && index >= 0) {
          this.users.splice(index, 1);
        }
        this.alertifyService.success('You have Unlike: ' + KnownAs);
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
