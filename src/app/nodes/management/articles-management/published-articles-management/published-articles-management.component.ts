import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {ArticlesManagementList, ManagementOperationResult, PublishedArticleQueryFilter, PublishedArticlesManagementListItem, QueryFilter} from '../../../../data-model/management';
import {ManagementService} from '../../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleStatus} from '../../../../data-model/draft';

@Component({
  selector: 'app-published-articles-management',
  template: `
    <div>
      <h2 class="articles-management-banner">Published Articles Management</h2>
    </div>
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'default'" [nzLoading]="operating" (click)="operate()" disabled>
        Revoke Published
      </button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
    </div>
    <nz-table #nzTable [nzAjaxData]="dataSet" [nzPageSize]="pageSize" [nzTotal]="totalNumberOfItems" [nzIsPagination]="shouldPagination"
               (nzPageIndexChange)="pageIndexChange($event)" [nzLoading]="loadingData || operating">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Title</span></th>
        <th nz-th>
          <span>Type</span>
          <nz-dropdown [nzTrigger]="'click'">
            <i class="anticon anticon-filter" nz-dropdown></i>
            <ul nz-menu>
              <nz-radio-group [(ngModel)]="filter.type">
                <li nz-menu-item>
                  <label nz-radio [nzValue]="'Original'">
                    <span>Original</span>
                  </label>
                </li>
                <li nz-menu-item>
                  <label nz-radio [nzValue]="'Reproduced'">
                    <span>Reproduced</span>
                  </label>
                </li>
                <li nz-menu-item>
                  <label nz-radio [nzValue]="'Translation'">
                    <span>Translation</span>
                  </label>
                </li>
              </nz-radio-group>
            </ul>
            <div nz-table-filter>
              <span nz-table-filter-confirm (click)="search()">OK</span>
              <span nz-table-filter-clear (click)="resetRadioFilter()">Reset</span>
            </div>
          </nz-dropdown>
        </th>
        <th nz-th>
          <span>Published Time</span>
          <nz-table-sort (nzValueChange)="search('pub_time', $event)"></nz-table-sort>
        </th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="refreshCheckStatus($event)">
          </label>
        </td>
        <td nz-td><a [routerLink]="['/site/article', data.pubId]">{{data.title}}</a></td>
        <td nz-td>{{data.type}}</td>
        <td nz-td>{{data.pubTime}}</td>
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
export class PublishedArticlesManagementComponent extends ArticlesManagementComponent implements OnInit {
  filter: PublishedArticleQueryFilter;
  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService,
  ) {
    super(_managementService, _nzMessageService);
    this.filter = new PublishedArticleQueryFilter('pub_time', 'Desc', null);
  }

  ngOnInit() {
    this.loadDataSet(1);
  }

  operate() {
    this.operating = true;
    console.log(this._managementService);
    this._managementService.deletePublishedArticles(this.checkedArticleIds).subscribe(
      (value: ManagementOperationResult) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success(`${this.articlesOperation.info} success!`);
        } else {
          this._nzMessageService.error(`${this.articlesOperation.info} failed!`);
        }
      },
      () => {
        this._nzMessageService.error(`Failed to ${this.articlesOperation.info}`);
        this.operating = false;
        this.loadingData = false;
      },
      () => {
        this.operating = false;
        this.loadDataSet(1);
      }
    );
  }

  initArticlesOperation() {
    this.articlesOperation = {state: ArticleStatus.Editing, info: 'Revoke published'};
  }

  get dataSet(): Array<PublishedArticlesManagementListItem> {
    return <Array<PublishedArticlesManagementListItem>>this._dataSet;
  }

  resetRadioField() {
    this.filter.type = null;
  }

  loadDataSet(pageIndex: number, filter?: QueryFilter) {
    this.loadingData = true;
    this._managementService.getPublishedArticlesManagementList(pageIndex, this.filter).subscribe(
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
