import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogManageComponent } from './blog-manage.component';

describe('BlogManageComponent', () => {
  let component: BlogManageComponent;
  let fixture: ComponentFixture<BlogManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
