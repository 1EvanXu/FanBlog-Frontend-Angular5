import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleContentComponent } from './article-content.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

describe('ArticleContentComponent', () => {
  let component: ArticleContentComponent;
  let fixture: ComponentFixture<ArticleContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgZorroAntdModule.forRoot()],
      declarations: [ ArticleContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleContentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
