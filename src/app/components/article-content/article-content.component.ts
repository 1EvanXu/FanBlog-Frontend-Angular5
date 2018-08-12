import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {PublishedArticle} from '../../data-model/published-article';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit, AfterViewChecked {
  @Input()
  article$: Observable<PublishedArticle>;
  article: PublishedArticle;
  @Input()
  loading: boolean;
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.article$.subscribe(value => {
      this.article = value;
    });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => { this.loading = false; }, 100);
  }
  get content() {
    return this.sanitizer.bypassSecurityTrustHtml(this.article.content);
  }
  get type(): string {
    const type = this.article.type;
    switch (type) {
      case 'Original': return '原';
      case 'Translation': return '译';
      case 'Reproduced': return '转';
      case defaultStatus: return '原';
    }
  }
  get typeStyle() {
    return {
      'article-type-o': this.article.type === 'Original',
      'article-type-t': this.article.type === 'Translation',
      'article-type-r': this.article.type === 'Reproduced'
    };
  }
}
