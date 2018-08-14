import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownEditorComponent} from './markdown-editor.component';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { EditorMdComponent } from './editor-md/editor-md.component';
import {MarkdownEditorService} from '../../services/markdown-editor.service';
import { ArticlePublishFormComponent } from './article-publish-form/article-publish-form.component';
import {MarkdownEditorApiClient} from '../../apis/markdown-editor.api.service';

const routes: Routes = [
  {
    path: 'editor',
    children: [
      {
        path: 'article',
        children: [
          {
            path: ':articleId',
            component: MarkdownEditorComponent
          },
          {
            path: 'new',
            component: MarkdownEditorComponent
          },
          {
            path: '',
            redirectTo: 'new',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'article',
        pathMatch: 'full'
      }
    ],
  }
];

@NgModule({
  declarations: [
    MarkdownEditorComponent,
    EditorMdComponent,
    ArticlePublishFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [MarkdownEditorService, MarkdownEditorApiClient],
  entryComponents: [ArticlePublishFormComponent]
})
export class MarkdownEditorModule { }
