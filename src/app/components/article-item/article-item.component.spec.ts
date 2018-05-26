import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleItemComponent } from './article-item.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {Router, RouterModule} from '@angular/router';

xdescribe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        NgZorroAntdModule.forRoot()
      ],
      declarations: [ ArticleItemComponent ],
      providers: [Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
