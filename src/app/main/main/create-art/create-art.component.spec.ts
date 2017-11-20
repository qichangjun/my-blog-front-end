import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArtComponent } from './create-art.component';

describe('CreateArtComponent', () => {
  let component: CreateArtComponent;
  let fixture: ComponentFixture<CreateArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
