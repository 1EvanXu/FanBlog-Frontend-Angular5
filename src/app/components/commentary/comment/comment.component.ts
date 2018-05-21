import {Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <div id="comment-box">
      <h2>
        <span>comment</span>
        <button nz-button nzType="default" [nzSize]="'small'"
                (click)="comment()" [nzLoading]="isSending" [disabled]="isEmptyContent">Send</button>
      </h2>
      <textarea nz-input  [(ngModel)]="commentContent" nzType="textarea" [nzAutosize]="{minRows: 2, maxRows: 6}"></textarea>
      <!--<nz-alert [nzType]="result.type" [nzMessage]="result.message" nzShowIcon [hidden]="hideAlert" style="margin-top: 10px;">-->
      <!--</nz-alert>-->
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
  result: {type: string, message: string};
  hideAlert = true;
  commentContent = '';
  oldCommentContent = '';
  isEmptyContent = true;
  constructor() { }

  ngOnInit() {
  }
  ngDoCheck() {
    if (this.commentContent !== this.oldCommentContent) {
      this.isEmptyContent = this.commentContent.length === 0;
      this.oldCommentContent = this.commentContent;
    }
  }
  comment() {
    // setTimeout(() => {
    //   this.isSending = true;
    //   this.result = {type: 'success', message: 'comment success!'};
    //   this.hideAlert = false;
    // }, 3000);
    // this.isSending = false;
    // this.hideAlert = true;
  }
}
