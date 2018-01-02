import { async, ComponentFixture, TestBed, fakeAsync,tick,flush } from '@angular/core/testing';
import { Component, OnInit,Inject,Input,Output,EventEmitter } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterLinkStubDirective } from '../../../testing/router-stubs';

import { AuthService } from '../../core/service/auth.service';
import { UserService } from './user/user.service';
import { CustomMaterialModule } from '../../custom-material.module';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'router-outlet',
  template: '<h1>111</h1>'
})
export class RouterOutletComponent {  
  constructor() {}
}

@Component({
  selector: 'app-advertising',
  template: '<h1>111</h1>'
})
export class AdvertisingComponent {  
  constructor() {}
}


class AuthServiceSpy{
  getCurrentUserInfo = jasmine.createSpy('getCurrentUserInfo').and.callFake(
    () => Promise.resolve(true).then(() => {         
        return {
          userName : 'qichangjun',
          role : 'admin'
        }
      }
    ))
}
class UserServiceSpy{
  getUserInfo = jasmine.createSpy('getUserInfo').and.callFake(
    () => Promise.resolve(true).then(() => {         
        return {
          userName : null,
          email : null,
          registerTime : null,
          role : null,
          message : [
            {_id:12345,content:'消息1'}
          ]
        }
      }
  ))
  deleteMessage = jasmine.createSpy('deleteMessage').and.callFake(
    (params) => Promise.resolve(true).then(() => {  
        expect(params).toBe(12345);
        return []
      }
  ))
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [CustomMaterialModule,NoopAnimationsModule],
      declarations: [ MainComponent,RouterLinkStubDirective,RouterOutletComponent,AdvertisingComponent ]
    }).overrideComponent(MainComponent,{
      set: {
        providers:[
          {provide:AuthService,useClass:AuthServiceSpy},
          {provide:UserService,useClass:UserServiceSpy}          
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a message list', fakeAsync(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const menuBtn = fixture.debugElement.query(By.css('.bell')).nativeElement; 
    menuBtn.click();
    fixture.detectChanges();
    const menuList = fixture.debugElement.query(By.css('.message-list')).nativeElement;
    expect(menuList.textContent).toContain('系统通知@') 
    expect(menuList.textContent).toContain('消息1') 
    const deleteHref = fixture.debugElement.query(By.css('.message-list a')).nativeElement;
    fixture.detectChanges();
    deleteHref.click()    
    flush();    
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.userInfo.message.length).toBe(0);
  }))
});
