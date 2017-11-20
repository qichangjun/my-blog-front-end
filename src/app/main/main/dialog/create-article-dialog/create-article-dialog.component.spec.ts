import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleDialogComponent } from './create-article-dialog.component';

describe('CreateArticleDialogComponent', () => {
  let component: CreateArticleDialogComponent;
  let fixture: ComponentFixture<CreateArticleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArticleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
