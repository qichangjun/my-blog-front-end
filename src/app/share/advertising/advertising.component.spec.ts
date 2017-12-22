import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AdvertisingComponent, } from './advertising.component';
import { MatCardModule,MatButtonModule } from '@angular/material';
import { click } from '../../../testing/util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AdvertisingComponent', () => {
  let component: AdvertisingComponent;
  let fixture: ComponentFixture<AdvertisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ MatCardModule,BrowserAnimationsModule,MatButtonModule ],
      declarations: [ AdvertisingComponent ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AdvertisingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  
  it('should click a button change Status', () => {
    const fixture = TestBed.createComponent(AdvertisingComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.isClosed).toBe(false);
    const btn = fixture.debugElement.query(By.css('.mat-button')).nativeElement;        
    btn.click();
    fixture.detectChanges();
    expect(component.isClosed).toBe(true);
  });
});
