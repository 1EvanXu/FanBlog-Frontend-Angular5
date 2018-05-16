import {Component, OnInit, DoCheck } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment',
  template: `
    <div id="comment-box">
      <h2>
        <span>comment</span>
        <button nz-button nzType="default" [nzSize]="'small'"
                (click)="comment()" [nzLoading]="isSending" [disabled]="isEmptyContent">Send</button>
      </h2>
      <textarea nz-input  [(ngModel)]="commentContent" nzType="textarea" [nzAutosize]="{minRows: 2}"></textarea>
    </div>
  `,
  styles: [
    `
      :host div#comment-box {
        display: block;
        padding: 8px;
        background-color: white;
        margin: 10px 1px 1px 1px;
      }
      :host h2 {
        margin: 4px
      }
      :host button {
        float: right
      }
    `
  ]
})
export class CommentComponent implements OnInit, DoCheck {
  isSending = false;
  commentContent = '';
  oldCommentContent = '';
  isEmptyContent = true;
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }
  ngDoCheck() {
    if (this.commentContent !== this.oldCommentContent) {
      this.isEmptyContent = this.commentContent.length === 0;
      this.oldCommentContent = this.commentContent;
    }
  }
  comment() {
    this._message.success('Comment Success!');
  }
}
