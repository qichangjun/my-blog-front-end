import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {
  isClosed : boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
