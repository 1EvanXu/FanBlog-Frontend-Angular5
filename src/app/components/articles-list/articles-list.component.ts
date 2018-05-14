import {Component, Input, OnInit} from '@angular/core';
import {ArticleItem} from '../../entities/article-item';

@Component({
  selector: 'app-articles-list',
  template: `
    <div nz-row>
      <app-article-item *ngFor="let articleItem of articlesList" [articleItem]="articleItem"></app-article-item>
    </div>
    <div nz-row style="background-color: white;padding: 5px;">
      <div nz-col [nzOffset]="4" [nzSpan]="16" style="text-align: center">
        <nz-pagination [(nzPageIndex)]="currentPage" [nzTotal]="50" [nzSize]="'small'"></nz-pagination>
      </div>
    </div>
  `,
  styles: []
})
export class ArticlesListComponent implements OnInit {
  @Input() articlesList: Array<ArticleItem>;
  currentPage: number;
  constructor() {
    this.articlesList = articleList;
  }

  ngOnInit() {
  }

}


const articleItem = new ArticleItem(
  'WebSocket协议深入探究',
  'Origin',
  'Network',
  'WebSocket的出现，使得浏览器具备了实时双向通信的能力。本文由浅入深，介绍了WebSocket如何建立连接、交换数据的细节，以及数据帧的格式。' +
  '此外，还简要介绍了针对WebSocket的安全攻击，以及协议是如何抵御类似攻击的。',
  '2018-5-10 16:25',
  '/article/d/1',
  100,
  95,
  97);

const articleList = [
  articleItem,
  articleItem,
  articleItem,
  articleItem,
  articleItem,
];
