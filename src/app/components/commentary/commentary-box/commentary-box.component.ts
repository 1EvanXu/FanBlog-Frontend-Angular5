import {Component, OnInit, Input, HostListener} from '@angular/core';
import {CommonCommentary} from '../../../entities/commentary';

@Component({
  selector: 'app-commentary-item',
  template: `
  <div [ngClass]="{'commentary': !isAttachment, 'attachment': isAttachment}">
    <a style="vertical-align: middle;" >
      <nz-avatar nzSize="small" nzIcon="user" style="display:inline-block; vertical-align: middle;"></nz-avatar>
      <span class="commentator">Commentator</span>
      <span class="comment-time">2018-5-14 16:09</span>
    </a>
    <a href="#comment-box" class="commentary-reply" [ngStyle]="{'display': showReply? 'inline' : 'none'}">reply</a>
    <p class="commentary-content">
      some contentsome contentsome contentsome contentsome contentsome contentsome contentsome contentsome contentsome content
    </p>
  </div>
  `,
  styles: [`
  :host .alignment .commentator .comment-time {
    vertical-align: middle;
  }

  :host span.commentator {
    margin-left: 5px;
    color: black;
  }

  :host span.comment-time {
    font-size: 8px;
    margin-left: 20px;
    color: darkgray;
  }

  :host p.commentary-content {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 30px
  }

  :host div.commentary {
    display: block;
    padding: 8px;
    background-color: white;
  }
  :host div.attachment{
    display: block;
    padding: 8px;
    background-color: ghostwhite;
    margin-left: 30px;
    margin-right: 10px;
  }
  :host .commentary-reply {
    float: right;
    margin-right: 10px;
  }
  `]
})
export class CommentaryItemComponent implements OnInit {

  private _isAttachment = false;
  private _showReply = false;
  private _commentary: CommonCommentary;
  constructor() { }
  ngOnInit() {
  }
  get isAttachment(): boolean {
    return this._isAttachment;
  }

  @Input()
  set isAttachment(value: boolean) {
    this._isAttachment = value;
  }
  get showReply(): boolean {
    return this._showReply;
  }

  set showReply(value: boolean) {
    this._showReply = value;
  }

  get commentary(): CommonCommentary {
    return this._commentary;
  }

  set commentary(value: CommonCommentary) {
    this._commentary = value;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showReply = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showReply = false;
  }
}

@Component({
  selector: 'app-commentary-box',
  template: `
  <div style="padding: 5px;">
    <app-commentary-item></app-commentary-item>
    <!--<ng-template #attachment>-->
    <!--</ng-template>-->
    <app-commentary-item [isAttachment]="true"></app-commentary-item>
  </div>
  `,
  styles: []
})
export class CommentaryBoxComponent {
  constructor() {}
}
