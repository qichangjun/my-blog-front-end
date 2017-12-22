import { tick,fakeAsync,async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogManageComponent } from './blog-manage.component';
import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { AuthService } from '../../../core/service/auth.service';
import { ActivatedRouteStub,RouterLinkStubDirective,queryParamsStubDirective,queryParamsHandlingStubDirective } from '../../../../testing/router-stubs';
import { ShareModule } from '../../../share/share.module';
import { ActivatedRoute,Router } from '@angular/router';
// import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { By } from '@angular/platform-browser';
describe('BlogManageComponent', () => {
  let component: BlogManageComponent;
  let fixture: ComponentFixture<BlogManageComponent>;
  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }

  class AuthServiceSpy {
    getCurrentUserInfo(){
      return {role:'admin'}
    }
  }

  class MainServiceSpy{
    getArticleLists = jasmine.createSpy('getArticleLists').and.callFake(
      (params) => Promise.resolve(true).then(() => {                 
          return {
            data : [
              {_id: "5a3c5fef7b9ca31175a20173", title: "箭头函数与普通函数的区别",author: "qichangjun"},                    
              {_id: "5a33293e4d96950addc904f4", title: "test", content: "test", author: "qichangjun"}
            ],
            totalElement : 2  
          }        
        }
      ))
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ShareModule],
      declarations: [ BlogManageComponent,RouterLinkStubDirective ],
      providers:[
        { provide : Router,useClass : RouterStub },
        { provide : ActivatedRoute,useClass : ActivatedRouteStub},
        { provide : AuthService,useClass : AuthServiceSpy},
        { provide : MainService,useClass : MainServiceSpy}
      ]
    })
    .compileComponents();
  }));

  it('should create',fakeAsync(() => {
    let fixture = TestBed.createComponent(BlogManageComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();    
  }));  

  it('should get artLists',fakeAsync(()=>{
    let fixture = TestBed.createComponent(BlogManageComponent);
    let el = fixture.debugElement.nativeElement;
    let component = fixture.componentInstance;
    fixture.detectChanges();    
    component.parameter = {
      currentPage : 1,
      pageSize : 10,
      sortField : 'lastReplyTime',
      totalElement : 1,
      userName : 'qichangjun'
    }
    tick();
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h3 a')).nativeElement;    
    expect(title.textContent).toBe('箭头函数与普通函数的区别')
  }))

});

