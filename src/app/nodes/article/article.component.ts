import {Component, OnInit, ViewChild} from '@angular/core';
import {PublishedArticleContentService} from '../../services/published-article-content.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {BreadcrumbService} from '../../services/channel.service';
import {PublishedArticle} from '../../data-model/published-article';
import {CommentaryComponent} from '../../components/commentary/commentary.component';


@Component({
  template: `
    <div nz-col [nzSm]="24" [nzMd]="1" style="margin-top: 5px">
      <app-side-tool-kits [pubId]="pubId"></app-side-tool-kits>
    </div>
    <div nz-col [nzSm]="20" [nzMd]="17" style="min-height:800px; margin-top: 5px">
      <app-article-content [loading]="articleLoading" [article$]="article$"></app-article-content>
      <app-comment [pubId]="pubId" (reload)="reloadCommentaries()"></app-comment>
      <app-commentary [pubId]="pubId"></app-commentary>
    </div>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {
  article$: Observable<PublishedArticle>;
  articleLoading: boolean;
  pubId: number;
  @ViewChild(CommentaryComponent) commentaryComponent: CommentaryComponent;
  constructor(
    private service: PublishedArticleContentService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setBreadcrumb(['Article', 'content']);
  }

  ngOnInit() {

    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.loadArticle(+params.get('pubId'))
      )
    );

    this.articleLoading = true;
  }

  private loadArticle(pubId: number) {
    this.pubId = pubId;
    return this.service.getArticleContent(pubId);
  }

  reloadCommentaries() {
    this.commentaryComponent.loadCommentaryList(1);
  }

}
