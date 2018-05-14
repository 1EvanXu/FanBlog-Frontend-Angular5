import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commentary',
  template: `
  <div class="commentary">
    <a style="vertical-align: middle;" >
      <nz-avatar nzSize="small" nzIcon="user" style="display:inline-block; vertical-align: middle;"></nz-avatar>
      <span class="commentator">Commentator</span>
      <span class="comment-time">2018-5-14 16:09</span>
    </a>
    <a href="" class="commentary-reply">reply</a>
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
  :host .attachment{
    display: block;
    padding: 8px;
    background-color: ghostwhite;
    margin-left: 30px;
  }
  :host .commentary-reply {
    float: right;
    margin-right: 10px;
  }
  `]
})
export class CommentaryComponent implements OnInit {

  @Input() isAttachment = false;

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-commentary-item',
  template: `
  <div class="commentary">
    <app-commentary></app-commentary>
    <ng-template #attachment>
    </ng-template>
  </div>
  `,
  styles: []
})
export class CommentaryItemComponent {
  constructor() {}
}
