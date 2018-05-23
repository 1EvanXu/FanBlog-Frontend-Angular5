import {Component, OnInit} from '@angular/core';
import {Article} from '../../entities/article';
import {ArticleContentService} from '../../services/article-content.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {delay, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
  template: `
    <div nz-col [nzSm]="24" [nzMd]="1">
      <app-side-tool-kits></app-side-tool-kits>
    </div>
    <div nz-col [nzSm]="20" [nzMd]="17" style="min-height:800px">
      <app-article-content [loading]="articleLoading" [article]="article$|async"></app-article-content>
      <app-comment></app-comment>
      <app-commentary [pubId]="pubId"></app-commentary>
    </div>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article>;
  articleLoading: boolean;
  constructor(
    private service: ArticleContentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.loadArticle(parseInt(params.get('pubId'), 0))
      )
    );
    this.articleLoading = true;
  }
  private loadArticle(pubId: number) {
    return this.service.loadArticleContent(pubId);
  }
  get pubId(): number {
    let pubId: number;
    this.article$.subscribe(a => pubId = a.pubId);
    return pubId;
  }

}
