import { inject,tick,fakeAsync,async, flush,ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogManageComponent } from './blog-manage.component';
import { Component,NgModule } from '@angular/core';
import { MainService } from '../main.service';
import { AuthService } from '../../../core/service/auth.service';
import { ActivatedRouteStub,RouterLinkStubDirective,queryParamsStubDirective,queryParamsHandlingStubDirective } from '../../../../testing/router-stubs';
import { ShareModule } from '../../../share/share.module';
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog, MatDialogRef,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { DeleteArticleDialogComponent } from '../dialog/delete-article-dialog/delete-article-dialog.component';

describe('BlogManageComponent', () => {
  let component: BlogManageComponent;
  let fixture: ComponentFixture<BlogManageComponent>;
  let dialog : MatDialog
  let overlayContainer: OverlayContainer;
  let overlayContainerElement
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
      (params?) => Promise.resolve(true).then(() => {                 
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
      imports:[ShareModule,NoopAnimationsModule,DialogTestModule],
      declarations: [ BlogManageComponent,RouterLinkStubDirective ],
      providers:[
        MatDialogConfig,MatDialog,
        { provide : Router,useClass : RouterStub },
        { provide : ActivatedRoute,useClass : ActivatedRouteStub},
        { provide : AuthService,useClass : AuthServiceSpy},
        { provide : MainService,useClass : MainServiceSpy}
      ],

    })
    .compileComponents();
  }));

  beforeEach(inject([MatDialog,OverlayContainer],
    (d: MatDialog ,oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
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

  it('should send art id to dialog',fakeAsync(()=>{
    let fixture = TestBed.createComponent(BlogManageComponent);
    fixture.detectChanges();   
    let component = fixture.componentInstance; 
    component.parameter = {
      currentPage : 1,
      pageSize : 10,
      sortField : 'lastReplyTime',
      totalElement : 1,
      userName : 'qichangjun'
    }
    tick();
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('a.deleteArt')).nativeElement; 
    title.click();
    flush();    
    fixture.detectChanges();
    let deleteTitle = overlayContainerElement.querySelector('span').textContent
    expect(deleteTitle).toContain('确定要删除标题为箭头函数与普通函数的区别的文章吗')
  }))
});

@NgModule({
  imports: [
    ShareModule
   ],
  exports: [DeleteArticleDialogComponent],
  declarations: [DeleteArticleDialogComponent],
  entryComponents: [
    DeleteArticleDialogComponent
  ]
})
class DialogTestModule { }