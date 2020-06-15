import { Component, OnInit } from '@angular/core';
import {Message} from '../_models/Message';
import { Pagination, PaginationResult } from '../_models/Pagination';
import { MessageService } from '../_services/message.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: 'Unread';
  constructor(public messageService: MessageService, private alertifyService: AlertifyService,
              private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.messageService.getMesage(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPages, this.messageContainer).subscribe(
      (res: PaginationResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertifyService.error(error);
      });
  }

  pageChange(event: any) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
