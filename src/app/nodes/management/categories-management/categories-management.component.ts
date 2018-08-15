import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {CategoriesManagementList, CategoryQueryFilter, ManagementOperationResult} from '../../../data-model/management';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-categorie-management',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="deletingCategories" (click)="deleteCategories()">Delete Categories</button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>

    </div>
    <nz-table #nzTable [nzAjaxData]="dataSet" [nzPageSize]="pageSize" [nzTotal]="totalNumberOfCategories"
              [nzIsPagination]="shouldPagination" (nzPageIndexChange)="pageChange($event)" [nzLoading]="loadingData || deletingCategories">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Name</span></th>
        <th nz-th>
          <span>Created Time</span>
          <nz-table-sort [(nzValue)]="filter.order" (nzValueChange)="search($event)"></nz-table-sort>
        </th>
        <th nz-th><span>Included Articles</span></th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="refreshStatus($event)">
          </label>
        </td>
        <td nz-td>{{data.name}}</td>
        <td nz-td>{{data.createdTime}}</td>
        <td nz-td>
          <nz-badge [nzShowZero]="true"
            [nzStyle]="getBadgeStyle(data.numberOfIncludedPubArticles)" [nzCount]="data.numberOfIncludedPubArticles"></nz-badge>
        </td>
      </tr>
      </tbody>
    </nz-table>
  `,
  styles: []
})
export class CategoriesManagementComponent implements OnInit {

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  deletingCategories = false;
  dataSet = [];
  indeterminate = false;
  checkedCategoriesId: number[] = [];
  filter = new CategoryQueryFilter('created_time', 'Desc');
  loadingData = false;
  totalNumberOfCategories: number;
  readonly pageSize = 6;


  constructor(
    private _managementService: ManagementService,
    private _nzMessageService: NzMessageService
  ) { }

  getBadgeStyle(n: number): { 'background-color': string } {
    if (n <= 2) {
      return { 'background-color': 'orange' } ;
    }
    if (n > 7) {
      return { 'background-color': 'firebrick' } ;
    }
    if (n > 5) {
      return { 'background-color': 'dodgerblue' } ;
    }
    return { 'background-color': 'forestgreen' };
  }
  refreshStatus() {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedCategoriesId = this.dataSet.filter(value => value.checked).map(value => value.id);
    this.checkedNumber = this.checkedCategoriesId.length;
  }

  checkAll(value) {
    if (value) {
      this.dataSet.forEach(data => data.checked = true);
    } else {
      this.dataSet.forEach(data => data.checked = false);
    }
    this.refreshStatus();
  }

  ngOnInit() {
    this.getCategoriesSet(1);
  }

  getCategoriesSet(pageIndex: number) {
    this.loadingData = true;
    this._managementService.getCategoriesManagementList(pageIndex, this.filter).subscribe(
      (value: CategoriesManagementList) => {
        this.dataSet = value.items;
        this.totalNumberOfCategories = value.totalNumberOfItems;
        this.refreshStatus();
      },
      () => {},
      () => this.loadingData = false
    );
  }

  pageChange(pageIndex: number) {
    this.getCategoriesSet(pageIndex);
  }

  deleteCategories() {
    this.deletingCategories = true;
    this._managementService.deleteArticleCategories(this.checkedCategoriesId)
      .pipe(delay(1000)).subscribe(
      (value: ManagementOperationResult) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success('Delete categories success!');
        } else {
          this._nzMessageService.error('Delete categories failed!');
        }
        this.getCategoriesSet(1);
      },
      () => this._nzMessageService.error('Some errors happened!'),
      () => this.deletingCategories = false
    );
  }

  search(order: 'ascend'|'descend'|null) {

    switch (order) {
      case 'ascend': this.filter.order = 'Asc'; break;
      case 'descend': this.filter.order = 'Desc'; break;
      default: this.filter.order = null;
    }
    this.getCategoriesSet(1);
  }

  get shouldPagination(): boolean {
    return this.totalNumberOfCategories > this.pageSize;
  }

}
