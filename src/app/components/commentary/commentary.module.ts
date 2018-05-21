import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentaryBoxComponent, CommentaryItemComponent} from './commentary-box/commentary-box.component';
import {CommentaryListComponent} from './commentary-list/commentary-list.component';
import {CommentComponent} from './comment/comment.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    CommentaryBoxComponent,
    CommentaryItemComponent,
    CommentaryListComponent,
    CommentComponent
  ],
  exports: [
    CommentComponent,
    CommentaryItemComponent,
    CommentaryListComponent,
  ],
  providers: []
})
export class CommentaryModule { }
