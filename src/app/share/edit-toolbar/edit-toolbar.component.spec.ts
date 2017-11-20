import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToolbarComponent } from './edit-toolbar.component';

describe('EditToolbarComponent', () => {
  let component: EditToolbarComponent;
  let fixture: ComponentFixture<EditToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
