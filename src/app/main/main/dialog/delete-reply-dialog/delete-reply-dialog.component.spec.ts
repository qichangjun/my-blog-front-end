import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReplyDialogComponent } from './delete-reply-dialog.component';

describe('DeleteReplyDialogComponent', () => {
  let component: DeleteReplyDialogComponent;
  let fixture: ComponentFixture<DeleteReplyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReplyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
