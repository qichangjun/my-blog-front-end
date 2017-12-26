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

import { DeleteReplyDialogComponent } from './delete-reply-dialog.component';
import { TopicService } from '../../topic/topic.service';


describe('DeleteReplyDialogComponent', () => {
  let dialogRef : MatDialogRef<DeleteReplyDialogComponent>;
  let component: DeleteReplyDialogComponent;
  let fixture: ComponentFixture<DeleteReplyDialogComponent>;
  let dialog: MatDialog;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let overlayContainerElement: HTMLElement;
  let overlayContainer: OverlayContainer;

  class TopicServiceSpy {
    deleteReply = jasmine.createSpy('deleteReply').and.callFake(
      (replyId,artId) => Promise.resolve(true).then(() => {         
        expect(replyId).toBe('replyId');    
        expect(artId).toBe('artId');    
        return true
      }
    ))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,DialogTestModule],
      declarations: []
    })
    .overrideComponent(DeleteReplyDialogComponent,{
      set: {
        providers:[
          {provide:TopicService,useClass:TopicServiceSpy}
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
    let dialogRef = dialog.open(DeleteReplyDialogComponent,{
      viewContainerRef: testViewContainerRef,
      data:{reply:{_id:111,title:'title'},artId:'artId'}
    })
    viewContainerFixture.detectChanges();    
    expect(dialogRef.componentInstance instanceof DeleteReplyDialogComponent).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  });

  it('should send delete id',fakeAsync(()=>{
    let dialogRef = dialog.open(DeleteReplyDialogComponent,{
      viewContainerRef: testViewContainerRef,
      data:{reply:{_id:'replyId',title:'title'},artId:'artId'}
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
    DeleteReplyDialogComponent,DirectiveWithViewContainer,ComponentWithChildViewContainer],
  entryComponents: [    
    DeleteReplyDialogComponent
  ]
})
class DialogTestModule { }