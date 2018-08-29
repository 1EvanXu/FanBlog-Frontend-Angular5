import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EditorMdComponent} from './editor-md/editor-md.component';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MarkdownEditorService, SaveStatus} from '../../services/markdown-editor.service';
import {ArticlePublishFormComponent} from './article-publish-form/article-publish-form.component';
import {TempDraft} from '../../data-model/draft';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageUploadModalComponent} from './image-upload-modal/image-upload-modal.component';
import {User} from '../../data-model/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-markdown-editor',
  template: `
    <nav style="height: 54px; padding: 13px; border-bottom: lightgray solid 1px;">
      <nz-tooltip [nzTitle]="'Back to Management'" [nzPlacement]="'bottomLeft'">
        <button nz-button nz-tooltip [nzType]="'default'" [nzSize]="'small'" style="position: relative; left: 30px" (click)="backToManagement()">
          <i class="anticon anticon-menu-fold" style="font-size: 15px;"></i>
        </button>
      </nz-tooltip>
      <span style="font-size: 16px;font-weight: bold; margin-left: 50px">
        Markdown Editor
      </span>
      <nz-avatar class="user-avatar" [nzSize]="'small'" [nzIcon]="'user'" [nzSrc]="user.avatarUrl"></nz-avatar>
    </nav>
    <div style="padding: 10px 25px; background-color: whitesmoke">
      <div nz-row>
        <div nz-col [nzSm]="12" [nzMd]="20" [nzLg]="21">
          <nz-input [nzSize]="'large'" [(ngModel)]="title"></nz-input>
        </div>
        <div nz-col [nzSm]="11" [nzMd]="3" [nzLg]="2">
          <button nz-button [nzSize]="'large'" [nzType]="'primary'"
                  style="margin: 0px 15px" (click)="showArticlePublishModal()">Publish</button>
        </div>
        <div nz-col [nzSm]="1" [nzMd]="1" [nzLg]="1" [ngSwitch]="saveStatusOfTmpDraft">
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
    <app-editor-md (saveAction)="manualSaveDraftContent()" (uploadImgAction)="showUploadImgModal()" [mdContent]="loadedMarkdownContent" (mdContentChange)="detectContentChanges()">
    </app-editor-md>
  `,
  styles: [`
    
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
    .user-avatar {
      position: absolute;
      right: 15px;
      top: 15px;
    }
  `]
})
export class MarkdownEditorComponent implements OnInit {
  tempDraftId: number;
  draftId: number;
  loadedMarkdownContent: string;
  OutputMarkdownContent: string;
  title: string;

  saveStatusOfTmpDraft = SaveStatus.UNKNOWN;
  saveStatusOfDraft = SaveStatus.UNKNOWN;

  tempDraft: TempDraft = new TempDraft();
  @ViewChild(EditorMdComponent) private editorMdComponent: EditorMdComponent;

  user: User;

  backToManagement() {
    this.router.navigate(['/management']);
  }

  canPublish(): boolean {
    if (!this.isValidTitle(this.title)) {
      this._nzMessageService.warning('The length of title must between 3 and 30!');
      return false;
    }
    if (this.saveStatusOfDraft !== SaveStatus.SAVED) {
      this._nzMessageService.warning('Auto save not completed!');
      return false;
    }

    if (this.saveStatusOfTmpDraft !== SaveStatus.SAVED) {
      this._nzMessageService.warning('Unsaved!');
      return false;
    }
    return true;
  }

  canDeactivate(): boolean {
    return this.saveStatusOfDraft === SaveStatus.SAVED && this.saveStatusOfTmpDraft === SaveStatus.SAVED;
  }


  isValidTitle(title: string): boolean {
    if (title === undefined) {
      return false;
    }
    const len = title.length;
    return len >= 3 && len < 30;
  }

  ngOnInit() {
    const currentUrl = this.router.url;

    if (currentUrl.match('editor/article/new$')) {
      this._mdEditorService.writeArticle().subscribe(
        value => { this.tempDraftId = value; console.log(`> TempDraftId: ${this.tempDraftId}`); }
      );
    } else if (currentUrl.match('editor/article/\\d+$')) {
      this.route.paramMap.subscribe(
        param => {
          this.draftId = +param.get('articleId');
          this.loadDraftContent(this.draftId);
        }
      );
    }

    this.autoSaveDraftContent();
  }

  detectContentChanges() {
    this.saveStatusOfTmpDraft = SaveStatus.SAVING;
  }

  private getHtmlContent(): string {
    return this._el.nativeElement.querySelector('.editormd-preview-container').innerHTML.toString();
  }

  manualSaveDraftContent() {

    if (!this.OutputMarkdownContent || !this.title || this.OutputMarkdownContent.length === 0 || this.title.length === 0) {
      this._nzMessageService.warning('Title and Content can\'t be empty!');
      return;
    }

    console.log('Manual Save', this.saveStatusOfDraft);

    this.detectContentChanges();

    const draft: TempDraft  = new TempDraft();
    draft.htmlContent = this.getHtmlContent();
    draft.tempDraftId = this.tempDraftId;
    draft.id = this.draftId;
    console.log(draft);
    this._mdEditorService.saveArticle(draft).subscribe(
      value => {
        if (value) {
          this.draftId = value;
          this.saveStatusOfDraft = SaveStatus.SAVED;
          this.saveStatusOfTmpDraft = SaveStatus.SAVED;
        } else {
          this.saveStatusOfDraft = SaveStatus.UNSAVED;
        }

      },
      () => this.saveStatusOfDraft = SaveStatus.UNSAVED
    );
  }

  autoSaveDraftContent() {
    this.editorMdComponent.mdContentChange$.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(value =>  {
        this.OutputMarkdownContent = value;
        return this._mdEditorService.saveArticleMarkdownContent(this.getTmpDraft());
      })).subscribe(
        value => this.saveStatusOfTmpDraft = value,
        () => this.saveStatusOfTmpDraft = SaveStatus.UNSAVED,
    );
  }

  getTmpDraft(): TempDraft {
    this.tempDraft.tempDraftId = this.tempDraftId;
    this.tempDraft.markdownContent = this.OutputMarkdownContent;
    this.tempDraft.id = this.draftId;
    this.tempDraft.title = this.title;
    return this.tempDraft;
  }

  getDraft(): TempDraft {
    this.getTmpDraft();
    this.tempDraft.markdownContent = this.editorMdComponent.getMarkContent();
    console.log(this.tempDraft);
    return this.tempDraft;
  }

  loadDraftContent(articleId: number) {
    this._mdEditorService.getArticle(articleId).subscribe(
      data => {
          console.log(data);
          this.tempDraft = data;
          this.loadedMarkdownContent = data.markdownContent;
          this.title = data.title;
      },
      () => { console.error('Some error happened!'); }
    );
  }

  showArticlePublishModal() {
    if (!this.canPublish()) {
      return;
    }
    const subscription = this._nzModalService.open({
      title: 'Publish Article',
      content: ArticlePublishFormComponent,
      footer: false,
      componentParams: {
        articleTitle: this.title,
        articleId: this.draftId
      }
    });
    subscription.subscribe(res => console.log(res));
  }

  showUploadImgModal() {
    console.log('show upload image modal!');
    this._nzModalService.open({
      title: 'Upload Image',
      content: ImageUploadModalComponent,
      // closable: false,
      footer: false,
    });
  }

  constructor(
    private _mdEditorService: MarkdownEditorService,
    private _nzModalService: NzModalService,
    private _nzMessageService: NzMessageService,
    private _el: ElementRef,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.user = this.authService.getUserFromCookie();
  }
}

