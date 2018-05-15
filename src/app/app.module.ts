import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleContentComponent } from './components/article-content/article-content.component';
import { SideInfoComponent } from './components/side-info/side-info.component';
import { CommentaryComponent, CommentaryItemComponent } from './components/commentary/commentary.component';
import { CommentComponent } from './components/commentary/comment/comment.component';
import { CommentaryListComponent } from './components/commentary/commentary-list/commentary-list.component';
import { FormsModule } from '@angular/forms';
import { ArticleComponent } from './nodes/article/article.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleItemComponent,
    ArticlesListComponent,
    ArticleContentComponent,
    SideInfoComponent,
    CommentaryComponent,
    CommentaryItemComponent,
    CommentComponent,
    CommentaryListComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
