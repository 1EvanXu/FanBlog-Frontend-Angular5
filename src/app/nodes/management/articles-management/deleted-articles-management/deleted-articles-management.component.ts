import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {ArticleQueryFilter, ArticlesManagementList, DeletedArticlesManagementListItem, ManagementOperationResult, QueryFilter} from '../../../../data-model/management';
import {ManagementService} from '../../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleStatus} from '../../../../data-model/draft';

@Component({
  selector: 'app-deleted-articles-management',
  template: `
    <div>
      <h2 class="articles-management-banner">Deleted Articles Management</h2>
    </div>
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="operating" (click)="operate()">Revoke Deleted</button>
      <button nz-button [disabled]="disabledButton || operating" [nzType]="'danger'" [nzLoading]="deletingPermanently" (click)="deleteArticlesPermanently()">Delete Permanently</button>
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
        <th nz-th>
          <span>Deleted Time</span>
          <nz-table-sort (nzValueChange)="search('latest_edited_time', $event)"></nz-table-sort>
        </th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="refreshCheckStatus($event)">
          </label>
        </td>
        <td nz-td><span style="color: red">{{data.title}}</span></td>
        <td nz-td>{{data.latestEditedTime}}</td>
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
  filter: ArticleQueryFilter;

  deletingPermanently = false;
  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService
  ) {
    super(_managementService, _nzMessageService);
    this.filter = new ArticleQueryFilter('latest_edit_time', 'Desc', ArticleStatus.Deleted);
  }

  ngOnInit() {
    this.loadDataSet( 1);
  }

  initArticlesOperation() {
    this.articlesOperation = { state: ArticleStatus.Editing, info: 'Revoke deleted'};
  }

  get dataSet(): Array<DeletedArticlesManagementListItem> {
    return <Array<DeletedArticlesManagementListItem>>this._dataSet;
  }

  deleteArticlesPermanently() {
    this.deletingPermanently = true;
    this._managementService.deleteDraftsPermanently(this.checkedArticleIds).subscribe(
      (value) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success('Delete articles permanently success!');
        } else {
          this._nzMessageService.error('Delete articles permanently failed!');
        }
      },
      () => {
        this._nzMessageService.error(`Failed to ${this.articlesOperation.info}`);
        this.operating = false;
        this.loadingData = false;
      },
      () => { this.deletingPermanently = false; this.loadDataSet( 1); }
    );
  }

  resetRadioField() {}

  loadDataSet(pageIndex: number, filter?: QueryFilter) {
    this.loadingData = true;
    this._managementService.getDeletedDraftsManagementList(pageIndex, this.filter).subscribe(
      (value: ArticlesManagementList) => {
        this._dataSet = value.items;
        this.totalNumberOfItems = value.totalNumberOfItems;
        this.refreshCheckStatus();
      },
      () => {
      },
      () => this.loadingData = false
    );
  }
}
