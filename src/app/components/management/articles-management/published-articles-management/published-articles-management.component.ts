import { Component, OnInit } from '@angular/core';
import {ArticlesManagementComponent} from '../articles-management.component';
import {ArticlesManagementType, ListFilter, ManagementOperationResult} from '../../../../data-model/management';
import {ManagementService} from '../../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-published-articles-management',
  template: `
    <div>
      <h2 class="articles-management-banner">Published Articles Management</h2>
    </div>
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="revoking" (click)="revokePublishedArticles()">Revoke</button>
      <button nz-button [disabled]="disabledButton" [nzLoading]="deleting" (click)="deleteArticles()">Delete</button>
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
          <span>Published Time</span>
          <nz-table-sort (nzValueChange)="search('pubTime', $event)"></nz-table-sort>
        </th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="refreshCheckStatus($event)">
          </label>
        </td>
        <td nz-td><a [routerLink]="['/blog/article', data.pubId]">{{data.title}}</a></td>
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
  revoking = false;
  constructor(
    public _managementService: ManagementService,
    public _nzMessageService: NzMessageService,
  ) {
    super(_managementService, _nzMessageService);
    this.articlesManagementType = ArticlesManagementType.Published;
    this.filter = new ListFilter();
  }

  ngOnInit() {
    this.getDataSet(this.articlesManagementType, 1);
  }

  revokePublishedArticles() {
    this.revoking = true;
    this._managementService.revokePublishedArticles(this.checkedArticleIds).pipe(delay(1000)).subscribe(
      (value) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success('Revoke success!');
        } else {
          this._nzMessageService.error('Revoke failed!');
        }
      },
      () => this._nzMessageService.error('Some errors happened!'),
      () => { this.revoking = false; this.getDataSet(this.articlesManagementType, 1); }
    );
  }
}
