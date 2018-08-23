import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
import {ReplyService} from '../../../services/channel.service';
import {CommentaryService} from '../../../services/commentary.service';
import {Comment} from '../../../data-model/commentary';

@Component({
  selector: 'app-comment',
  template: `
    <div id="comment-box">
      <h2>
        <span *ngIf="!replyTo">comment</span><span *ngIf="replyTo">reply to {{replyTo.name}}:</span>
        
        <button nz-button nzType="primary" [nzSize]="'small'"
                (click)="comment()" [nzLoading]="isSending" [disabled]="isEmptyContent">Send</button>
        <button nz-button nzType="default" [nzSize]="'small'"
                (click)="cleanContent()" [disabled]="isEmptyContent">Clean</button>
      </h2>
      <nz-input [(ngModel)]="commentContent" nzType="textarea" [nzAutosize]="{minRows: 2, maxRows: 6}"></nz-input>
      <app-comment-alert [alertType]="result" [showAlert]="showAlert"></app-comment-alert>
    </div>
  `,
  styles: [
    `
      div#comment-box {
        display: block;
        padding: 8px;
        background-color: white;
        margin: 10px 1px 1px 1px;
      }
      :host h2 {
        margin: 4px
      }
      :host button {
        float: right;
        margin-left: 5px;
      }
    `
  ]
})
export class CommentComponent implements OnInit, DoCheck {
  parent: number;
  replyTo: {id: number; name: string};
  isSending = false;
  result: 'success'|'failed';
  showAlert = false;
  commentContent = '';
  @Output() reload = new EventEmitter<any>();

  isEmptyContent = true;
  private _oldCommentContent = '';
  @Input() pubId: number;
  constructor(private replyService: ReplyService, private commentaryService: CommentaryService) {
    this.replyService.info$.subscribe(
      info => {
        this.parent = info.parent;
        this.replyTo = info.replyTo;
        // console.log(info);
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

  cleanContent() {
    this.commentContent = '';
  }

  comment() {
    const comment: Comment = {
      commentator: 1,
      content: this.commentContent,
      parent: this.parent,
      replyTo: this.replyTo !== undefined ? this.replyTo.id : null
    };
    this.isSending = true;
    this.commentaryService.postCommentary(this.pubId, comment).subscribe(
      value => {
        this.result = value;
        this.showAlert = true;
        this.reload.emit();
      },
    () => { this.isSending = false; this.result = 'failed'; this.showAlert = true; },
      () => { this.isSending = false; }
    );
    setTimeout(() => {this.showAlert = false; }, 2000);
  }
}


