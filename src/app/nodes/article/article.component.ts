import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbService} from '../../services/channel.service';
import {Article} from '../../data-model/article';
import {CommentaryComponent} from '../../components/commentary/commentary.component';


@Component({
  template: `
    <div nz-col [nzSm]="24" [nzMd]="1" style="margin-top: 5px">
      <app-side-tool-kits [pubId]="pubId"></app-side-tool-kits>
    </div>
    <div nz-col [nzSm]="20" [nzMd]="17" style="min-height:800px; margin-top: 5px">
      <app-article-content [loading]="articleLoading" [article]="article"></app-article-content>
      <app-comment [pubId]="pubId" (reload)="reloadCommentaries()"></app-comment>
      <app-commentary [pubId]="pubId"></app-commentary>
    </div>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleLoading: boolean;
  pubId: number;
  @ViewChild(CommentaryComponent) commentaryComponent: CommentaryComponent;
  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setBreadcrumb(['Article', 'content']);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => { this.pubId = +param.get('pubId'); });
    this.route.data
      .subscribe((data: { article: Article }) => {
        this.article = data.article;
      });

    this.articleLoading = true;
  }

  reloadCommentaries() {
    this.commentaryComponent.loadCommentaryList(1);
  }

}
