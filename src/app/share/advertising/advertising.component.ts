import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class AdvertisingComponent implements OnInit {
  isClosed : boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
