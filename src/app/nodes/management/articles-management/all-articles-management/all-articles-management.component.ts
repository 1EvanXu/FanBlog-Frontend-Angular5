import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {ManagementService} from '../../../../services/management.service';
import {AllArticlesManagementListItem, ListFilter} from '../../../../data-model/management';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-all-articles-management',
  template: `
    <div>
      <h2 class="articles-management-banner">All Articles Management</h2>
    </div>
    <nz-table #nzTable [nzAjaxData]="dataSet" [nzPageSize]="pageSize" [nzTotal]="totalNumberOfItems" [nzIsPagination]="shouldPagination"
              [nzPageIndex]="" (nzPageIndexChange)="pageIndexChange($event)" [nzLoading]="loadingData">
      <thead nz-thead>
      <tr>
        <th nz-th><span>Title</span></th>
        <th nz-th>
          <span>Type</span>
          <nz-dropdown [nzTrigger]="'click'">
            <i class="anticon anticon-filter" nz-dropdown></i>
            <ul nz-menu>
              <nz-radio-group [(ngModel)]="filter.articleTypeFilter">
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
              <span nz-table-filter-clear (click)="resetArticleTypeFilter()">Reset</span>
            </div>
          </nz-dropdown>
        </th>
        <th nz-th>
          <span>CreatedTime</span>
          <nz-table-sort [nzValue]="filter.timeFilterType === 'createdTime' ? filter.timeFilterOrder : null"
                         (nzValueChange)="search('createdTime', $event)"></nz-table-sort>
        </th>
        <th nz-th>
          <span>LatestModify</span>
          <nz-table-sort [nzValue]="filter.timeFilterType === 'latestModify' ? filter.timeFilterOrder : null"
                         (nzValueChange)="search('latestModify', $event)"></nz-table-sort>
        </th>
        <th nz-th><span>Status</span></th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td>{{data.title}}</td>
        <td nz-td>{{data.type}}</td>
        <td nz-td>{{data.createdTime}}</td>
        <td nz-td>{{data.latestModify}}</td>
        <td nz-td [ngSwitch]="data.status">
            <nz-tag *ngSwitchCase="'Published'" [nzColor]="'#87d068'">Published</nz-tag>
            <nz-tag *ngSwitchCase="'Editing'" [nzColor]="'#2db7f5'">Editing</nz-tag>
            <nz-tag *ngSwitchCase="'Deleted'" [nzColor]="'#f50'">Deleted</nz-tag>
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
export class AllArticlesManagementComponent extends ArticlesManagementComponent implements OnInit {

  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService
  ) {
    super(_managementService, _nzMessageService);
    this.filter = new ListFilter();
  }

  ngOnInit() {
    this.loadDataSet(1);
  }

  initArticlesManagementListGetter() {
    this.articlesManagementListGetter = this._managementService.getAllArticlesManagementList;
  }

  initArticlesOperation() {}

  get dataSet(): Array<AllArticlesManagementListItem> {
    return <Array<AllArticlesManagementListItem>>this._dataSet;
  }
}
