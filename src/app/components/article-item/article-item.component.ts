import {Component, Input, OnInit} from '@angular/core';
import {PublishedArticleItem} from '../../data-model/article-item';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article-item',
  template: `
    <div class="article-item">
      <div nz-row style="padding: 2px;">
        <h1><a [routerLink]="['/site/article', articleItem.pubId]" style="text-decoration-line: none">{{articleItem.title}}</a></h1>
      </div>
      <div nz-row class="article-abstract">
        <p [innerHtml]="content"></p>
      </div>
      <div nz-row >
        <div nz-col [nzSpan]="4">
          <span class="article-tag"><b>{{articleItem.type}}</b></span>
        </div>
        <div nz-col [nzSpan]="4">
          <span><i class="anticon anticon-tag-o"></i>&nbsp;{{articleItem.category}}</span>
        </div>
        <div nz-col [nzSpan]="6">
          <span><i class="anticon anticon-clock-circle-o"></i>&nbsp;{{articleItem.pubTime}}</span>
        </div>
        <div nz-col [nzSpan]="4">
          <span><i class="anticon anticon-eye-o"></i>&nbsp;{{articleItem.visitorCount}}</span>
        </div>
        <div nz-col [nzSpan]="3">
          <span><i class="anticon anticon-like-o"></i>&nbsp;{{articleItem.voteCount}}</span>
        </div>
        <div nz-col [nzSpan]="3">
          <span><i class="anticon anticon-message"></i>&nbsp;{{articleItem.commentaryCount}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .article-item {
      background-color: white;
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 12px;
    }

    .article-tag {
      background-color: lightgray;
      border-radius: 4px;
      font-size: 10px;
      padding: 3px;
      text-align: center;
      margin: 2px;
      align-self: center;
    }

    .article-abstract {
      color: darkgray;
      font-size: 14px;
      margin-bottom: 12px;
      margin-top: 12px;
      margin-left: 5px;
    }
    a:link {color:black;}    /* 未被访问的链接 */
    a:visited {color:gray} /* 已被访问的链接 */
    a:hover {color: dodgerblue;} /* 鼠标指针移动到链接上 */
    a:active {color: rebeccapurple}

  `]
})
export class ArticleItemComponent implements OnInit {

  @Input() articleItem: PublishedArticleItem;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  get content() {
    return this.sanitizer.bypassSecurityTrustHtml(this.articleItem.articleAbstract);
  }
}
