import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleContentComponent} from '../../components/article-content/article-content.component';
import {ArticleComponent} from './article.component';
import {CommentaryModule} from '../../components/commentary/commentary.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SideToolKitsComponent} from '../../components/side-tool-kits/side-tool-kits.component';
import {PublishedArticleContentService} from '../../services/published-article-content.service';
import {PublishedArticleContentApiClient} from '../../apis/published-article-content.api.service';
import {ArticleResolverService} from './article-resolver.service';


@NgModule({
  imports: [
    CommonModule,
    CommentaryModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    ArticleComponent,
    ArticleContentComponent,
    SideToolKitsComponent,
  ],
  exports: [],
  providers: [PublishedArticleContentService, PublishedArticleContentApiClient, ArticleResolverService]
})
export class ArticleModule { }
