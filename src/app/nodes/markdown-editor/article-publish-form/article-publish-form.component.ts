import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {NZ_MESSAGE_CONFIG, NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {MarkdownEditorService} from '../../../services/markdown-editor.service';
import {TempArticle} from '../../../data-model/article';
import {ArticleCategory} from '../../../data-model/draft';
import {isNumber} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-publish-form',
  template: `
    <form nz-form [formGroup]="articlePublishForm" (ngSubmit)="submitForm($event,articlePublishForm.value)">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="title" nz-form-item-required>Title</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-input [nzSize]="'large'" formControlName="title" [nzId]="'title'"></nz-input>
          <div nz-form-explain *ngIf="getFormControl('title').dirty&&getFormControl('title').hasError('required')">
            The title of Article is required!
          </div>
          <div nz-form-explain *ngIf="getFormControl('title').dirty&&getFormControl('title').hasError('maxlength')">
            The title of Article can't long than 80 letters!
          </div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="type" nz-form-item-required>Type</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-select formControlName="type" [nzPlaceHolder]="'Search Choose a type'" [nzSize]="'large'" nzAllowClear>
            <nz-option *ngFor="let option of typeOptions" [nzLabel]="option.label" [nzValue]="option" [nzDisabled]="option.disabled">
            </nz-option>
          </nz-select>
          <div nz-form-explain *ngIf="getFormControl('type').dirty&&getFormControl('type').hasError('required')">
            The type of Article is required!
          </div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="category" nz-form-item-required>Category</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-select formControlName="category" nzTags (nzSearchChange)="searchCategory($event)" [nzNotFoundContent]="'Not Found!'"
                     [nzPlaceHolder]="'Choose a category'" [(ngModel)]="selectedCategoryOption" [nzSize]="'large'" nzAllowClear>
            <nz-option
              *ngFor="let option of categoryOptions"
              [nzLabel]="option.label"
              [nzValue]="option"
              [nzDisabled]="option.disabled">
            </nz-option>
          </nz-select>
          <div nz-form-explain *ngIf="getFormControl('category').dirty&&getFormControl('category').hasError('required')">
            The category of Article is required!
          </div>
          <div nz-form-explain *ngIf="getFormControl('category').dirty&&getFormControl('category').hasError('maxlength')">
            Only one category can be chose!
          </div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-col [nzOffset]="6" [nzSpan]="12" nz-form-control>
          <button nz-button [nzSize]="'large'" (click)="resetForm($event)">Reset</button>
          <button nz-button [nzType]="'primary'" [nzSize]="'large'" [disabled]="!articlePublishForm.valid" [nzLoading]="isSubmitting">
            Submit
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [],
  providers: [{ provide: NZ_MESSAGE_CONFIG, useValue: {
      nzDuration             : 1500,
      nzMaxStack             : 7,
      nzPauseOnHover         : true,
      nzAnimate              : true
    }
  }]
})
export class ArticlePublishFormComponent implements OnInit {

  typeOptions = [];
  defaultSelectedTypeOption: {value: string; label: string};
  categoryOptions = [];
  selectedCategoryOption: {value: number; label: string};
  articleId: number;
  articlePublishForm: FormGroup;
  isSubmitting: boolean;
  articleTitle: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _nzModalSubject: NzModalSubject,
    private _nzMessageService: NzMessageService,
    private _router: Router,
    private _mdEditorService: MarkdownEditorService
  ) {}

  ngOnInit() {
    this.typeOptions = [
      { value: 'Original', label: 'Original' },
      { value: 'Reproduced', label: 'Reproduced' },
      { value: 'Translation', label: 'Translation'}
    ];
    this.defaultSelectedTypeOption = this.typeOptions[0];
    this.createForm();
  }

  createForm() {
    this.articlePublishForm = this._formBuilder.group({
      title: [this.articleTitle, [Validators.required, Validators.maxLength(80)]],
      type: [this.defaultSelectedTypeOption, Validators.required],
      category: [null, [Validators.required, Validators.maxLength(1)]]
    });
  }

  getFormControl(formControlName: string) {
    return this.articlePublishForm.controls[formControlName];
  }

  submitForm = ($event, value) => {
    this.isSubmitting = true;
    $event.preventDefault();
    for (const key in this.articlePublishForm.controls) {
      this.articlePublishForm.controls[key].markAsDirty();
    }
    let category: ArticleCategory;
    if (isNumber(value.category[0].value)) {
      category = {id: value.category[0].value, name: value.category[0].label};
    } else {
      category = {id: null, name: value.category[0]};
    }

    const tempArticle: TempArticle = {
      title: value.title,
      type: value.type.value,
      category: category,
      draftId: this.articleId
    };

    console.log(tempArticle);

    this._mdEditorService.publishArticle(tempArticle).subscribe(
      result => {
        if (result) {
            this._nzMessageService.success('Publish succeed!');
            this._router.navigate(['/management/articles/published']);
        } else {
          this._nzMessageService.error('Publish failed!');
        }
      },
      () => { this._nzMessageService.error('Error happened!'); },
      () => {
        this._nzModalSubject.destroy('onCancel');
        this.isSubmitting = false;
      }
    );
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.articlePublishForm.reset();
    for (const key in this.articlePublishForm.controls) {
      this.articlePublishForm.controls[ key ].markAsPristine();
    }
  }

  searchCategory(keywords) {
    const query = encodeURI(keywords);

    this._mdEditorService.searchCategories(query).subscribe(
      value => {
        this.categoryOptions = value.map(item => ({label: item.name, value: item.id}));
      }
    );
  }

}
