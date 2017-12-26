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

import { CreateArticleDialogComponent } from './create-article-dialog.component';
import { MainService } from '../../main.service';

describe('CreateArticleDialogComponent', () => {
  let dialogRef : MatDialogRef<CreateArticleDialogComponent>;
  let component: CreateArticleDialogComponent;
  let fixture: ComponentFixture<CreateArticleDialogComponent>;
  let dialog: MatDialog;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let overlayContainerElement: HTMLElement;
  let overlayContainer: OverlayContainer;


  class MainServiceSpy {
    createArticle = jasmine.createSpy('createArticle').and.callFake(
      (params) => Promise.resolve(true).then(() => {         
        expect(params.title).toBe('title');
        expect(params.content).toBe('content');        
        return true
      }
    ))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,DialogTestModule],
      declarations: []
    })
    .overrideComponent(CreateArticleDialogComponent,{
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
    let dialogRef = dialog.open(CreateArticleDialogComponent,{
      viewContainerRef: testViewContainerRef
    })
    viewContainerFixture.detectChanges();    
    expect(dialogRef.componentInstance instanceof CreateArticleDialogComponent).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  });

  it('should send artInfo',fakeAsync(()=>{
    let dialogRef = dialog.open(CreateArticleDialogComponent,{
      viewContainerRef: testViewContainerRef
    });
    viewContainerFixture.detectChanges();   
    tick();
    viewContainerFixture.detectChanges();
    let titleInput = (overlayContainerElement.querySelector('input[name=userName]') as HTMLInputElement);
    titleInput.value = 'title';
    titleInput.dispatchEvent(newEvent('input'));
    let textareaInput = (overlayContainerElement.querySelector('textarea[name=content]') as HTMLInputElement);
    textareaInput.value = 'content';
    textareaInput.dispatchEvent(newEvent('input'));
    (overlayContainerElement.querySelector('button[type=submit]') as HTMLElement).click();    
    viewContainerFixture.detectChanges();       
    tick();
    viewContainerFixture.detectChanges();
    flush();    
    expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(0); 
  }))
});



//--------------app-label-toolbar模拟指令-------------------
@Component({
  selector: 'app-label-input',
  template: '<h1>appLabelInputComponent</h1>'
})
export class appLabelInputComponent { 
  @Input() chips; 
  @Output() addLabel = new EventEmitter<any>();
  constructor() {}
}

//--------------app-edit-toolbar模拟指令-------------------
@Component({
  selector: 'app-edit-toolbar',
  template: '<textarea style="min-height: 200px;padding: 10px 10px;width:100%;"  [(ngModel)]="artInfo" ></textarea>'
})
export class appLabelEditComponent {  
  @Input() artInfo; 
  constructor() {}
}

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
    appLabelInputComponent,
    appLabelEditComponent,
    CreateArticleDialogComponent,DirectiveWithViewContainer,ComponentWithChildViewContainer],
  entryComponents: [    
    CreateArticleDialogComponent
  ]
})
class DialogTestModule { }