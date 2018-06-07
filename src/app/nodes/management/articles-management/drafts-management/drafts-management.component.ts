import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {ArticlesManagementType, ListFilter} from '../../../../data-model/management';
import {ManagementService} from '../../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-drafts-management',
  template: `
    <h2 class="articles-management-banner">Drafts Management</h2>
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="deleting" (click)="deleteArticles()">Delete</button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
    </div>
    <nz-table #nzTable [nzAjaxData]="dataSet" [nzPageSize]="pageSize" [nzTotal]="totalNumberOfItems" [nzIsPagination]="shouldPagination"
              [nzPageIndex]="" (nzPageIndexChange)="pageIndexChange($event)" [nzLoading]="loadingData">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Title</span></th>
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
        <td nz-td>{{data.type}}</td>
        <td nz-td>{{data.createdTime}}</td>
        <td nz-td>{{data.latestModify}}</td>
        <td nz-td>
          <a [routerLink]="['/editor/', data.id]">Edit</a>
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
  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService
  ) {
    super(_managementService, _nzMessageService);
    this.articlesManagementType = ArticlesManagementType.Draft;
    this.filter = new ListFilter();
  }

  ngOnInit() {
    this.getDataSet(this.articlesManagementType, 1);
  }

}
