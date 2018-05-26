import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentaryItemBoxComponent, } from './commentary-item-box/commentary-item-box.component';
import { CommentaryListComponent} from './commentary-list/commentary-list.component';
import {CommentComponent} from './comment/comment.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {CommentaryService} from '../../services/commentary.service';
import { CommentariesDirective } from './commentaries.directive';
import {CommentaryItemComponent} from './commentary-item/commentary-item.component';
import {CommentaryComponent} from './commentary.component';
import {CommentAlertComponent} from './comment-alert/comment-alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    CommentaryItemBoxComponent,
    CommentaryItemComponent,
    CommentaryListComponent,
    CommentaryComponent,
    CommentComponent,
    CommentariesDirective,
    CommentAlertComponent
  ],
  exports: [
    CommentComponent,
    CommentaryComponent,
  ],
  providers: [CommentaryService],
  entryComponents: [CommentaryListComponent]
})
export class CommentaryModule {
}
