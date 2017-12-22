import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';
// import { MainService } from '../main.service';
import { element } from 'protractor';
import { RouterModule,Router,ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub,RouterLinkStubDirective,queryParamsStubDirective,queryParamsHandlingStubDirective } from '../../../../testing/router-stubs';
import { ShareModule } from '../../../share/share.module'; 
import { MainService } from '../main.service';
// import { AuthService } from '../../../core/service/auth.service';
// import { ConstantService } from '../../../core/service/constant.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  let MainServiceStub = {
    getArticleLists : () => {
      Promise.resolve(1)
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ShareModule,RouterModule],
      declarations: [ ListComponent ],
      providers: [ActivatedRouteStub,
        { provide: ActivatedRoute,      useClass: ActivatedRouteStub },
        { provide: Router,              useClass: RouterStub },
        { provide: MainService,         useValue: MainServiceStub },
        { provide: LocationStrategy,    useClass: HashLocationStrategy }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors',() =>{
    let mainService : MainService;
    let spy;
    let de;
    let linkDes;
    let links;

    beforeEach(() => {
      fixture = TestBed.createComponent(ListComponent);
      fixture.detectChanges();
      mainService = fixture.debugElement.injector.get(MainService);
      spy = spyOn(mainService,'getArticleLists')
            .and.returnValue(Promise.resolve({
              data:[{title:'title1'}],
              code : 1
            }))
      de = fixture.debugElement.query(By.css('.mat-line a'))      
    });
  
    it('should create', () => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance
      expect(component).toBeTruthy();
    });
  
    it('should stll not show quote after OnInit',()=>{
      fixture = TestBed.createComponent(ListComponent);
      fixture.detectChanges();
    })
  })
  
});
