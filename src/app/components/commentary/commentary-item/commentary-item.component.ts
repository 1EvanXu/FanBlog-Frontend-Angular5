import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ChildCommentary, Commentary} from '../../../entities/commentary';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentComponent} from '../comment/comment.component';

@Component({
  selector: 'app-commentary-item',
  template: `
    <div [ngClass]="{'commentary': !isChildCommentary, 'child-commentary': isChildCommentary}">
      <a style="vertical-align: middle;" >
        <nz-avatar nzSize="small" nzIcon="user" style="display:inline-block; vertical-align: middle;"></nz-avatar>
        <span class="commentator">{{commentary.commentator}}</span>
        <span class="comment-time">{{commentary.commentTime}}</span>
      </a>
      <a class="commentary-reply" (click)="reply()"
         [ngStyle]="{'display': showReply? 'inline' : 'none'}">reply</a>
      <p class="commentary-content">
        {{commentary.commentaryContent}}
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
  :host div.child-commentary{
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
  @Input()
  isChildCommentary = false;
  @Input()
  commentary: Commentary | ChildCommentary;
  showReply = false;
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    // console.log('CommentaryItemComponent=======>', this.commentary);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showReply = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showReply = false;
  }

  reply() {
    if (this.commentary instanceof ChildCommentary) {
    }
    // 观察者模式
    // this.router.navigate(['./comment-box'], {relativeTo: this.route});
  }
}

