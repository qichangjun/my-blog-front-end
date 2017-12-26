import { async, ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';
import { Component, OnInit,Inject,Input,Output,EventEmitter } from '@angular/core';

import { ShareModule } from '../../../share/share.module';
import { RouterStub,ActivatedRouteStub,queryParamsStubDirective,queryParamsHandlingStubDirective } from '../../../../testing/router-stubs'
import { Router,ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,MatListModule,MatDialogConfig } from '@angular/material';
import { By } from '@angular/platform-browser';
import { ListComponent } from './list.component';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  class MainServiceSpy{
    getArticleLists = jasmine.createSpy('getArticleLists').and.callFake(
      (params) => Promise.resolve(true).then(() => {         
          return {
            data : [
              {title:'title',author:'author',label:['label1'],_id:111}
            ],
            totalElement : 1
          }
        }
      ))
    getLabelLists = jasmine.createSpy('getLabelLists').and.callFake(
      (params) => Promise.resolve(true).then(() => {         
          return [{name:'label1',_id:11111}]
        }
      ))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,MatDialogModule,MatListModule,PaginationModule],
      declarations: [ ListComponent,RouterLinkStubDirective,queryParamsStubDirective,queryParamsHandlingStubDirective],
      providers:[
        PaginationConfig,MatDialogConfig,
        {provide:ActivatedRoute,useClass:ActivatedRouteStub},
        {provide:Router,useClass:RouterStub}                
      ]
    }).overrideComponent(ListComponent,{
      set: {
        providers:[
          {provide:MainService,useClass:MainServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    let route = TestBed.get(ActivatedRoute)
    route.testParams = {labels:'labels1',currentPage:1}
  })

  it('should be create',()=>{
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('should get list info ',fakeAsync(()=>{
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const titleEl = fixture.debugElement.query(By.css('h3 a')).nativeElement; 
    expect(titleEl.textContent).toBe('title')    
  }))

  it('should get label info ',fakeAsync(()=>{
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('span.chip')).nativeElement; 
    expect(labelEl.textContent).toContain('label1')    
  }))

  it('should toggle label status ',fakeAsync(()=>{
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('span.chip')).nativeElement; 
    labelEl.click();
    fixture.detectChanges();
    expect(component.parameter.labels.length).toBe(2)
    labelEl.click();
    expect(component.parameter.labels.length).toBe(1)
  }))
});
