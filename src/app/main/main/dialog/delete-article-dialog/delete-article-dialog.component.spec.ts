import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArticleDialogComponent } from './delete-article-dialog.component';

describe('DeleteArticleDialogComponent', () => {
  let component: DeleteArticleDialogComponent;
  let fixture: ComponentFixture<DeleteArticleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteArticleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
