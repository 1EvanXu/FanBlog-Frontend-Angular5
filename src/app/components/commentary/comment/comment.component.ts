import {Component, OnInit, DoCheck, Input} from '@angular/core';
import {ReplyService} from '../../../services/channel.service';

@Component({
  selector: 'app-comment',
  template: `
    <div id="comment-box">
      <h2>
        <span *ngIf="!replyTo">comment</span><span *ngIf="replyTo">reply to {{replyTo.name}}:</span>
        <button nz-button nzType="default" [nzSize]="'small'"
                (click)="comment()" [nzLoading]="isSending" [disabled]="isEmptyContent">Send</button>
      </h2>
      <nz-input [(ngModel)]="commentContent" nzType="textarea" [nzAutosize]="{minRows: 2, maxRows: 6}"></nz-input>
      <app-comment-alert [alertType]="result" [showAlert]="showAlert"></app-comment-alert>
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
  parentCommentary: number;
  replyTo: {id: number; name: string};
  isSending = false;
  result: 'success'|'failed';
  showAlert = false;
  commentContent = '';
  // commentator: string;
  isEmptyContent = true;
  private _oldCommentContent = '';
  @Input() pubId: number;
  constructor(private replyService: ReplyService) {
    this.replyService.info$.subscribe(
      info => {
        this.parentCommentary = info.parentCommentary;
        this.replyTo = info.replyTo;
        console.log(info);
      }
    );
  }

  ngOnInit() {
  }
  ngDoCheck() {
    if (this.commentContent !== this._oldCommentContent) {
      this.isEmptyContent = this.commentContent.length <= 5;
      this._oldCommentContent = this.commentContent;
    }
  }
  comment() {
    setTimeout(() => {
      this.result = 'success';
      this.isSending = false;
      this.showAlert = true;
    }, 3000);
    this.isSending = true;
    this.showAlert = false;
  }
}


