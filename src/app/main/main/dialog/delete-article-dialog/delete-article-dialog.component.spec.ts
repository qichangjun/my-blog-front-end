import { async, ComponentFixture, TestBed, inject, tick, fakeAsync,flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule,MatDialogModule,MatInputModule } from '@angular/material';
import { DebugElement,NgModule,Inject,Input,Output,EventEmitter ,
  Injector,ViewContainerRef,Directive,Component,ViewChild
 } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';
import { ComponentWithChildViewContainer,DirectiveWithViewContainer } from '../../../../../testing/dialogContainer'
import { newEvent } from '../../../../../testing/util'

import { MainService } from '../../main.service';
import { DeleteArticleDialogComponent } from './delete-article-dialog.component';

describe('DeleteArticleDialogComponent', () => {
  let dialogRef : MatDialogRef<DeleteArticleDialogComponent>;
  let component: DeleteArticleDialogComponent;
  let fixture: ComponentFixture<DeleteArticleDialogComponent>;
  let dialog: MatDialog;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let overlayContainerElement: HTMLElement;
  let overlayContainer: OverlayContainer;


  class MainServiceSpy {
    deleteArticle = jasmine.createSpy('deleteArticle').and.callFake(
      (params) => Promise.resolve(true).then(() => {         
        expect(params).toBe(111);    
        return true
      }
    ))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,DialogTestModule],
      declarations: []
    })
    .overrideComponent(DeleteArticleDialogComponent,{
      set: {
        providers:[
          {provide:MainService,useClass:MainServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(inject([MatDialog,OverlayContainer],
    (d: MatDialog ,oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(()=>{
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);
    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  })

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    let dialogRef = dialog.open(DeleteArticleDialogComponent,{
      viewContainerRef: testViewContainerRef,
      data:{row:{_id:111,title:'title'}}
    })
    viewContainerFixture.detectChanges();    
    expect(dialogRef.componentInstance instanceof DeleteArticleDialogComponent).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    let deleteTitle = overlayContainerElement.querySelector('span').textContent
    expect(deleteTitle).toContain('确定要删除标题为title的文章吗')
  });

  it('should send delete id',fakeAsync(()=>{
    let dialogRef = dialog.open(DeleteArticleDialogComponent,{
      viewContainerRef: testViewContainerRef,
      data:{row:{_id:111,title:'title'}}
    });
    viewContainerFixture.detectChanges();   
    tick();
    viewContainerFixture.detectChanges();
    (overlayContainerElement.querySelector('button[type=submit]') as HTMLElement).click();    
    viewContainerFixture.detectChanges();       
    tick();
    viewContainerFixture.detectChanges();
    flush();    
    expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(0); 
  }))
});




@NgModule({
  imports: [
    MatInputModule,
    MatDialogModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule],
  exports: [MatInputModule,DirectiveWithViewContainer,ComponentWithChildViewContainer],
  declarations: [   
    DeleteArticleDialogComponent,DirectiveWithViewContainer,ComponentWithChildViewContainer],
  entryComponents: [    
    DeleteArticleDialogComponent
  ]
})
class DialogTestModule { }