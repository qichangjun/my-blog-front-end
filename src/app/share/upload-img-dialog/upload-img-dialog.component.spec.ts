import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImgDialogComponent } from './upload-img-dialog.component';

describe('UploadImgDialogComponent', () => {
  let component: UploadImgDialogComponent;
  let fixture: ComponentFixture<UploadImgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
