import { async, ComponentFixture, TestBed, inject, tick, fakeAsync,flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RegisterDialogComponent } from './register-dialog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule,MatDialogModule,MatInputModule } from '@angular/material';
import { LoginService } from '../../login.service';
import { DebugElement,NgModule,Inject,
  Injector,ViewContainerRef,Directive,Component,ViewChild
 } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';
import { ComponentWithChildViewContainer,DirectiveWithViewContainer } from '../../../../../testing/dialogContainer'
import { newEvent } from '../../../../../testing/util'
describe('RegisterDialogComponent', () => {
  let dialogRef : MatDialogRef<RegisterDialogComponent>;
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  let loginService : LoginService;
  let dialog: MatDialog;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let overlayContainerElement: HTMLElement;
  let overlayContainer: OverlayContainer;

  class LoginServiceSpy{
    register = jasmine.createSpy('register').and.callFake(
      (params) => Promise.resolve(true).then(() => {         
          expect(params.userName).toBe('qichangjun');
          expect(params.password).toBe('123456');
          expect(params.email).toBe('111@qq.com');
          return true
        }
      ))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({      
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,DialogTestModule],
      providers:[]
    })
    .overrideComponent(RegisterDialogComponent,{
      set: {
        providers:[
          {provide:LoginService,useClass:LoginServiceSpy}
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
    let dialogRef = dialog.open(RegisterDialogComponent,{
      viewContainerRef: testViewContainerRef
    })
    viewContainerFixture.detectChanges();    
    expect(dialogRef.componentInstance instanceof RegisterDialogComponent).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  });

  it('should send register info',fakeAsync(()=>{
    let dialogRef = dialog.open(RegisterDialogComponent,{
      viewContainerRef: testViewContainerRef
    })
    viewContainerFixture.detectChanges();   
    tick();
    viewContainerFixture.detectChanges();
    let userNameInput = (overlayContainerElement.querySelector('input[name=userName]') as HTMLInputElement);
    userNameInput.value = 'qichangjun';
    userNameInput.dispatchEvent(newEvent('input'));
    let passwordInput = (overlayContainerElement.querySelector('input[name=password]') as HTMLInputElement);
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(newEvent('input'));
    let emailInput = (overlayContainerElement.querySelector('input[name=email]') as HTMLInputElement);
    emailInput.value = '111@qq.com';
    emailInput.dispatchEvent(newEvent('input'));
    (overlayContainerElement.querySelector('button[type=submit]') as HTMLElement).click();            
    viewContainerFixture.detectChanges();       
    tick();
    viewContainerFixture.detectChanges();
    flush();    
    expect(overlayContainerElement.querySelectorAll('.mat-dialog-container').length).toBe(0);
       
  }))

  it('should close dialog with cancel button',fakeAsync(()=>{
    let dialogRef = dialog.open(RegisterDialogComponent,{
      viewContainerRef: testViewContainerRef
    })
    viewContainerFixture.detectChanges();       
    (overlayContainerElement.querySelector('button[type=button]') as HTMLElement).click();    
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
  exports: [MatInputModule,RegisterDialogComponent,DirectiveWithViewContainer,ComponentWithChildViewContainer],
  declarations: [RegisterDialogComponent,DirectiveWithViewContainer,ComponentWithChildViewContainer],
  entryComponents: [
    RegisterDialogComponent
  ]
})
class DialogTestModule { }