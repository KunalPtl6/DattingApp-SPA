import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './Test.component.html',
  styleUrls: ['./Test.component.css']
})
export class TestComponent implements OnInit {
  testData: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  getValues() {
    this.http.get('http://localhost:4200/api/Test').subscribe(response => {
      this.testData = response;
    }, error => {
      console.log(error);
    });
  }
}
