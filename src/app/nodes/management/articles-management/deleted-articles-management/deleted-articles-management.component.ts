import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {DeletedArticlesManagementListItem, ManagementOperationResult} from '../../../../data-model/management';
import {ManagementService} from '../../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {delay} from 'rxjs/operators';
import {ArticleStatus} from '../../../../data-model/article';

@Component({
  selector: 'app-deleted-articles-management',
  template: `
    <div>
      <h2 class="articles-management-banner">Deleted Articles Management</h2>
    </div>
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="operating" (click)="operate()">Revoke Deleted</button>
      <button nz-button [disabled]="disabledButton" [nzType]="'danger'" [nzLoading]="deletingPermanently" (click)="deleteArticlesPermanently()">Delete Permanently</button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
    </div>
    <nz-table #nzTable [nzAjaxData]="dataSet" [nzPageSize]="pageSize" [nzTotal]="totalNumberOfItems" [nzIsPagination]="shouldPagination"
              [nzPageIndex]="" (nzPageIndexChange)="pageIndexChange($event)" [nzLoading]="loadingData || operating || deletingPermanently">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Title</span></th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="refreshCheckStatus($event)">
          </label>
        </td>
        <td nz-td><span style="color: red">{{data.title}}</span></td>
      </tr>
      </tbody>
    </nz-table>
  `,
  styles: [`
    .articles-management-banner {
      margin-bottom: 10px;
    }
  `]
})
export class DeletedArticlesManagementComponent extends ArticlesManagementComponent implements OnInit {
  deletingPermanently = false;
  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService
  ) {
    super(_managementService, _nzMessageService);
  }

  ngOnInit() {
    this.loadDataSet( 1);
  }

  initArticlesManagementListGetter() {
    this.articlesManagementListGetter = this._managementService.getDeletedArticlesManagementList;
  }

  initArticlesOperation() {
    this.articlesOperation = { state: ArticleStatus.Editing, info: 'Revoke deleted'};
  }

  get dataSet(): Array<DeletedArticlesManagementListItem> {
    return <Array<DeletedArticlesManagementListItem>>this._dataSet;
  }

  deleteArticlesPermanently() {
    this.deletingPermanently = true;
    this._managementService.deleteArticlesPermanently(this.checkedArticleIds).pipe(delay(1000)).subscribe(
      (value) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success('Delete articles permanently success!');
        } else {
          this._nzMessageService.error('Delete articles permanently failed!');
        }
      },
      () => this._nzMessageService.error('Some errors happened!'),
      () => { this.deletingPermanently = false; this.loadDataSet( 1); }
    );
  }
}
