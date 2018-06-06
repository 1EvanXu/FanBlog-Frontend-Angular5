import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {CategoriesListFilter, CategoriesManagementList, ManagementOperationResult} from '../../../data-model/management';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-categorie-management',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="deletingCategories" (click)="deleteCategories()">Delete Categories</button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
      <!--<div style="display: inline-block; float: right;">-->
        <!--<button nz-button [nzType]="'dashed'">-->
          <!--<i class="anticon anticon-plus"></i><span style="margin-right: 4px;">Create</span>-->
        <!--</button>-->
      <!--</div>-->
    </div>
    <nz-table #nzTable [nzDataSource]="dataSet" [nzPageSize]="10" [nzTotal]="totalNumberOfCategories" (nzPageIndexChange)="pageChange($event)" [nzLoading]="loadingData">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Name</span></th>
        <th nz-th>
          <span>Created Time</span>
          <nz-table-sort [(nzValue)]="categoriesListFilter.order" (nzValueChange)="search($event)"></nz-table-sort>
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
          {{data.numberOfIncludedArticles}}
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
  categoriesListFilter = new CategoriesListFilter();
  loadingData = false;
  totalNumberOfCategories: number;

  constructor(
    private _managementService: ManagementService,
    private _nzMessageService: NzMessageService
  ) { }

  getBadgeStyle(n: number) {
    if (n <= 5) {
      return {};
    }
    if (n > 20) {
      return {backgroundColor: ''};
    }
    if (n > 10) {
      return {backgroundColor: '#00c4ff'};
    }
    return {};
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

  getCategoriesSet(pageIndex: number, filter?: CategoriesListFilter) {
    this.loadingData = true;
    this._managementService.getCategoriesManagementList(pageIndex, filter)
      .pipe(delay(1000)).subscribe(
      (value: CategoriesManagementList) => {
        this.dataSet = value.items;
        this.totalNumberOfCategories = value.totalNumberOfCategories;
        this.refreshStatus();
      },
      () => {},
      () => {
        this.loadingData = false;
      }
    );
  }

  pageChange(pageIndex: number) {
    this.getCategoriesSet(pageIndex, this.categoriesListFilter);
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
        this.getCategoriesSet(1, this.categoriesListFilter);
      },
      () => this._nzMessageService.error('Some errors happened!'),
      () => this.deletingCategories = false
    );
  }

  search(order: 'ascend'|'descend'|null) {
    this.categoriesListFilter.order = order;
    this.getCategoriesSet(1, this.categoriesListFilter);
  }

}