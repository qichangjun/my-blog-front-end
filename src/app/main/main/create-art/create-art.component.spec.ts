import { async, ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';
import { Component, OnInit,Inject,Input,Output,EventEmitter } from '@angular/core';
import { CreateArtComponent } from './create-art.component';
import { ShareModule } from '../../../share/share.module';
import { RouterStub } from '../../../../testing/router-stubs'
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { By } from '@angular/platform-browser';

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


describe('CreateArtComponent', () => {
  let component: CreateArtComponent;
  let fixture: ComponentFixture<CreateArtComponent>;

  class MainServiceSpy{
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
      imports:[FormsModule,ReactiveFormsModule,MatDialogModule],
      declarations: [ CreateArtComponent,RouterLinkStubDirective,appLabelEditComponent,appLabelInputComponent ],
      providers:[
        {provide:Router,useClass:RouterStub}        
      ]
    }).overrideComponent(CreateArtComponent,{
      set: {
        providers:[
          {provide:MainService,useClass:MainServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  it('should be create',()=>{
    fixture = TestBed.createComponent(CreateArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('should send artInfo to service', fakeAsync(() => {
    fixture = TestBed.createComponent(CreateArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.artInfo.title = 'title'
    component.artInfo.content = 'content'
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;  
    submitBtn.click();
    tick();
    fixture.detectChanges();

  }));
});
