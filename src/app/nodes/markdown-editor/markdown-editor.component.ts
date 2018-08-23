import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EditorMdComponent} from './editor-md/editor-md.component';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NzModalService} from 'ng-zorro-antd';
import {MarkdownEditorService, SaveStatus} from '../../services/markdown-editor.service';
import {ArticlePublishFormComponent} from './article-publish-form/article-publish-form.component';
import {Draft, TempDraft} from '../../data-model/draft';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs/observable/of';


@Component({
  selector: 'app-markdown-editor',
  template: `
    <nav style="height: 50px; padding: 15px; border-bottom: lightgray solid 1px;">
      <img class="logo" src="../../../assets/logo.png">
      <span style="font-size: 15px;font-weight: bold; margin-left: 50px">
        &nbsp;Article Editor
      </span>
    </nav>
    <div style="padding: 10px 25px; background-color: whitesmoke">
      <div nz-row>
        <div nz-col [nzSm]="19" [nzMd]="20" [nzLg]="21">
          <nz-input [nzSize]="'large'" [(ngModel)]="title"></nz-input>
        </div>
        <div nz-col [nzSm]="4" [nzMd]="3" [nzLg]="2">
          <button nz-button [nzSize]="'large'" [nzType]="'primary'"
                  style="margin: 0px 15px" [disabled]="!canPublish" (click)="showArticlePublishModal()">Publish</button>
        </div>
        <div nz-col [nzSm]="1" [nzMd]="1" [nzLg]="1" [ngSwitch]="saveStatus">
          <span  *ngSwitchCase="'SAVED'">
            <i class="anticon anticon-check-circle saved"></i>
          </span>
          <span  *ngSwitchCase="'UNSAVED'" >
            <i class="anticon anticon-close-circle unsaved"></i>
          </span>
          <span  *ngSwitchCase="'SAVING'">
            <i class="anticon anticon-loading-3-quarters anticon-spin saving"></i>
          </span>
        </div>
      </div>
    </div>
    <app-editor-md (saveAction)="manualSaveContent()" [mdContent]="loadedMarkdownContent" (mdContentChange)="detectContentChanges()">
    </app-editor-md>
  `,
  styles: [`
    .logo {
      width: 90px;
      height: 25px;
      border-radius: 6px;
      float: left;
    }
    .saved {
      color: forestgreen;
      font-size: 13px;
      margin: 8px 4px
    }
    .unsaved {
      color: orangered;
      font-size: 13px;
      margin: 8px 4px
    }
    .saving {
      color: dodgerblue;
      font-size: 13px;
      margin: 8px 4px
    }
  `]
})
export class MarkdownEditorComponent implements OnInit {
  tempArticleId: number;
  articleId: number;
  loadedMarkdownContent: string;
  OutputMarkdownContent: string;
  title: string;

  saveStatus = SaveStatus.UNKNOWN;
  draft: TempDraft = new TempDraft();
  @ViewChild(EditorMdComponent) private editorMdComponent: EditorMdComponent;

  get canPublish(): boolean {
    return this.saveStatus === SaveStatus.SAVED && Boolean(this.title);
  }

  ngOnInit() {
    const currentUrl = this.router.url;

    if (currentUrl.match('editor/article/new$')) {
      this._mdEditorService.writeArticle().subscribe(
        value => { this.tempArticleId = value; console.log(`===>${this.tempArticleId}`); }
      );
    } else if (currentUrl.match('editor/article/\\d+$')) {
      this.route.paramMap.subscribe(
        param => {
          this.articleId = +param.get('articleId');
          this.loadArticleContent(this.articleId);
        }
      );
    }

    this.autoSaveContent();
  }

  detectContentChanges() {
    this.saveStatus = SaveStatus.SAVING;
  }

  private getHtmlContent(): string {

    return this._el.nativeElement.querySelector('.editormd-preview-container').innerHTML.toString();
  }

  manualSaveContent() {

    console.log('manual save', this.saveStatus);

    this.detectContentChanges();

    const article: Draft  = <Draft>this.getArticle();
    article.htmlContent = this.getHtmlContent();
    this._mdEditorService.saveArticle(article).subscribe(
      value => {
        if (value) {
          this.articleId = value;
          this.saveStatus = SaveStatus.SAVED;
        } else {
          this.saveStatus = SaveStatus.UNSAVED;
        }

      },
      () => this.saveStatus = SaveStatus.UNSAVED
    );
  }

  autoSaveContent() {
    this.editorMdComponent.mdContentChange$.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(value =>  {
        this.OutputMarkdownContent = value;
        return this._mdEditorService.saveArticleMarkdownContent(this.getDraft());
      })).subscribe(
        value => this.saveStatus = value
    );
  }

  getDraft(): TempDraft {
    this.draft.tempDraftId = this.tempArticleId;
    this.draft.markdownContent = this.OutputMarkdownContent;
    this.draft.id = this.articleId;
    this.draft.title = this.title;
    console.log(this.draft);
    return this.draft;
  }

  getArticle(): TempDraft {
    this.draft.tempDraftId = this.tempArticleId;
    this.draft.markdownContent = this.editorMdComponent.getMarkContent();
    this.draft.id = this.articleId;
    this.draft.title = this.title;
    console.log(this.draft);
    return this.draft;
  }

  loadArticleContent(articleId: number) {
    this._mdEditorService.getArticle(articleId).subscribe(
      data => {
          console.log(data);
          this.draft = data;
          this.loadedMarkdownContent = data.markdownContent;
          this.title = data.title;
      }
    );
  }

  showArticlePublishModal() {
    const subscription = this._nzModalService.open({
      title: 'Publish Article',
      content: ArticlePublishFormComponent,
      footer: false,
      componentParams: {
        articleTitle: this.title,
        articleId: this.articleId
      }
    });
    subscription.subscribe(res => console.log(res));
  }

  constructor(
    private _mdEditorService: MarkdownEditorService,
    private _nzModalService: NzModalService,
    private _el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
}

