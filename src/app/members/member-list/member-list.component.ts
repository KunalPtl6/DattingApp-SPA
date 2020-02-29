import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  filterForm: FormGroup;
  GenderDDL = [{key: 'male', value: 'male'}, {key: 'female', value: 'female'}];
  constructor(public userService: UserService, private alertifyService: AlertifyService,
              private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.CreateFilterForm();
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
  }

  CreateFilterForm() {
    this.filterForm = this.fb.group({
      minAge: ['18'],
      maxAge: ['99'],
      gender: ['ALL'],
      orderBy: ['lastActive']
    });
  }

  pageChange(event: any) {
    this.pagination.currentPage = event.page;
    this.LoadUsers();
  }

  LoadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPages, this.filterForm.value).subscribe(
      (res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertifyService.error(error);
      });
  }

  resetFilter() {
    this.filterForm.patchValue({
      minAge: '18',
      maxAge: '99',
      gender: 'ALL',
      orderBy: 'lastActive'
    });
    this.LoadUsers();
  }

}
