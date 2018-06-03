import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePublishFormComponent } from './article-publish-form.component';

describe('ArticlePublishFormComponent', () => {
  let component: ArticlePublishFormComponent;
  let fixture: ComponentFixture<ArticlePublishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePublishFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePublishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
