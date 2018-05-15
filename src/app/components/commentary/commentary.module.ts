import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentaryComponent, CommentaryItemComponent} from './commentary.component';
import {CommentComponent} from './comment/comment.component';
import {CommentaryListComponent} from './commentary-list/commentary-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CommentaryComponent,
    CommentaryItemComponent,
    CommentComponent,
    CommentaryListComponent
  ],

})
export class CommentaryModule { }
