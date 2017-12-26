import { async, ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';
import { Component, OnInit,Inject,Input,Output,EventEmitter } from '@angular/core';

import { ShareModule } from '../../../share/share.module';
import { RouterStub, ActivatedRouteStub } from '../../../../testing/router-stubs';
import { Router,ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { EditArticleComponent } from './edit-article.component';
import { TopicService } from '../topic/topic.service';

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


describe('editArtComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  class TopicServiceSpy{
    getArticleDetail = jasmine.createSpy('getArticleDetail').and.callFake(
      (params) => Promise.resolve(true).then(() => {   
        expect(params.id).toBe(111);                  
          return {
            content : 'content',
            title : 'title'
          }
        }
    ))
  }

  class MainServiceSpy{
    editArticle = jasmine.createSpy('editArticle').and.callFake(
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
      declarations: [ EditArticleComponent,RouterLinkStubDirective,appLabelEditComponent,appLabelInputComponent ],
      providers:[        
        {provide:ActivatedRoute,useClass:ActivatedRouteStub},
        {provide:Router,useClass:RouterStub}        
      ]
    }).overrideComponent(EditArticleComponent,{
      set: {
        providers:[
          {provide:MainService,useClass:MainServiceSpy},
          {provide:TopicService,useClass:TopicServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    let route = TestBed.get(ActivatedRoute)
    route.testParams = {id:111}
  })

  it('should be create',()=>{
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('should send artInfo to service', fakeAsync(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick()
    fixture.detectChanges();
                  
    expect(component.artInfo.title).toBe('title')
    expect(component.artInfo.content).toBe('content')
  }));
});
