import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      console.log(this.user);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageurl = [];
    for (const photo of this.user.photos) {
      imageurl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.Description
      });
    }
    return imageurl;
  }

  AgeCalculate(BirthDate: Date) {
    let Age = 0;
    if (BirthDate != null && BirthDate !== undefined) {
      const timeDiff = Math.abs(Date.now() - new Date(BirthDate).getTime());
      Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    return Age + ' Years';
  }

}
