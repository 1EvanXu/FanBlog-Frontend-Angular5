import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {ArticleQueryFilter, ArticlesManagementList, DraftsManagementListItem, QueryFilter} from '../../../../data-model/management';
import {ManagementService} from '../../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleStatus} from '../../../../data-model/draft';

@Component({
  selector: 'app-drafts-management',
  template: `
    <h2 class="articles-management-banner">Drafts Management</h2>
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'default'" [nzLoading]="operating" (click)="operate()">Delete</button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
    </div>
    <nz-table #nzTable [nzAjaxData]="dataSet" [nzPageSize]="pageSize" [nzTotal]="totalNumberOfItems" [nzIsPagination]="shouldPagination"
              [nzPageIndex]="" (nzPageIndexChange)="pageIndexChange($event)" [nzLoading]="loadingData || operating">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Title</span></th>
        <th nz-th>
          <span>CreatedTime</span>
          <nz-table-sort [nzValue]="filter.orderField === 'created_time' ? filter.order : null"
                         (nzValueChange)="search('created_time', $event)"></nz-table-sort>
        </th>
        <th nz-th>
          <span>LatestModify</span>
          <nz-table-sort [nzValue]="filter.orderField === 'latest_edited_time' ? filter.order : null"
                         (nzValueChange)="search('latest_edited_time', $event)"></nz-table-sort>
        </th>
        <th nz-th></th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="refreshCheckStatus($event)">
          </label>
        </td>
        <td nz-td>{{data.title}}</td>
        <td nz-td>{{data.createdTime}}</td>
        <td nz-td>{{data.latestEditedTime}}</td>
        <td nz-td>
          <a [routerLink]="['/editor/article', data.id]">edit</a>
        </td>
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
export class DraftsManagementComponent extends ArticlesManagementComponent implements OnInit {

  filter: ArticleQueryFilter;

  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService
  ) {
    super(_managementService, _nzMessageService);
    this.filter = new ArticleQueryFilter('created_time', 'Desc', ArticleStatus.Editing);

  }

  ngOnInit() {
    this.loadDataSet( 1);
  }

  initArticlesOperation() {
    this.articlesOperation = {state: ArticleStatus.Deleted, info: 'Delete articles'};
  }

  get dataSet(): Array<DraftsManagementListItem> {
    return <Array<DraftsManagementListItem>>this._dataSet;
  }

  resetRadioField() {
    this.filter.status = null;
  }

  loadDataSet(pageIndex: number, filter?: QueryFilter) {
    this.loadingData = true;
    this._managementService.getDraftsManagementList(pageIndex, this.filter).subscribe(
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
