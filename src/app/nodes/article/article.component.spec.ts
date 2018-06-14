import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {PublishedArticleContentService} from '../../services/published-article-content.service';
import {CommentaryModule} from '../../components/commentary/commentary.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ArticleContentComponent} from '../../components/article-content/article-content.component';
import {SideToolKitsComponent} from '../../components/side-tool-kits/side-tool-kits.component';

xdescribe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CommentaryModule,
        RouterModule,
        NgZorroAntdModule.forRoot()
      ],
      declarations: [
        ArticleComponent,
        ArticleContentComponent,
        SideToolKitsComponent,
      ],
      providers: [PublishedArticleContentService, ActivatedRoute]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
