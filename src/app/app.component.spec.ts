import { TestBed, async,ComponentFixture } from '@angular/core/testing';
import { Component} from '@angular/core';
import { AppComponent } from './app.component';

import { By } from '@angular/platform-browser';

@Component({
  selector: 'router-outlet',
  template: '<h1>111</h1>'
})
export class RouterOutletComponent {  
  constructor() {}
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let linkDes;
  let links;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[],
      declarations: [
        AppComponent,
        RouterOutletComponent
      ],
      providers:[]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
    })
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
