import {Component, OnInit, DoCheck, Input} from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <div id="comment-box">
      <h2>
        <span>comment</span>
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
  isSending = false;
  result: 'success'|'sending'|'failed';
  showAlert = false;
  commentContent = '';
  private oldCommentContent = '';
  isEmptyContent = true;
  constructor() { }

  ngOnInit() {
  }
  ngDoCheck() {
    if (this.commentContent !== this.oldCommentContent) {
      this.isEmptyContent = this.commentContent.length <= 5;
      this.oldCommentContent = this.commentContent;
    }
  }
  comment() {
    setTimeout(() => {
      this.result = 'success';
      this.isSending = false;
      this.showAlert = true;
    }, 3000);
    this.isSending = true;
    this.result = 'sending';
    this.showAlert = false;
  }
}

@Component({
  selector: 'app-comment-alert',
  template: `
    <div class="comment-alert" [hidden]="!showAlert" >
      <span [ngStyle]="textStyle">
        <i [ngClass]="alertIcon"></i>
        &nbsp;{{alertMessage}}
      </span>
    </div>
  `,
  styles: [`
    .comment-alert {
      text-align: center; margin-top: 10px
    }
  `]
})
export class CommentAlertComponent {
  @Input()
  alertType: 'success'|'sending'|'failed';
  @Input()
  showAlert: boolean;
  get textStyle() {
    let textColor;
    switch (this.alertType) {
      case 'success': textColor = 'green'; break;
      case 'sending': textColor = 'dodgerblue'; break;
      case 'failed': textColor = 'red'; break;
      case defaultStatus: textColor = 'gray';
    }
    return {'color': textColor};
  }
  get alertIcon() {
    return {
      'anticon': true,
      'anticon-check-circle-o': this.alertType === 'success',
      'anticon-close-circle-o': this.alertType === 'failed',
      'anticon-loading anticon-spin': this.alertType === 'sending'
    };
  }
  get alertMessage(): string {
    let message;
    switch (this.alertType) {
      case 'success': message = 'Comment success!'; break;
      case 'sending': message = 'Sending...'; break;
      case 'failed': message = 'Comment failed!'; break;
      case defaultStatus: message = 'gray';
    }
    return message;
  }
}
