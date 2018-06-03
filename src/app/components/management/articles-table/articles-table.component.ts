import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-table',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="operating" (click)="_operateData()">
        Delete
      </button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
    </div>
    <nz-table #nzTable [nzDataSource]="dataSet" [nzPageSize]="10" (nzDataChange)="displayDataChange($event)"
              (nzPageIndexChange)="_refreshStatus()" (nzPageSizeChange)="_refreshStatus()" [nzLoading]="false">
      <thead nz-thead>
      <tr>
        <th nz-th nzCheckbox>
          <label nz-checkbox [(ngModel)]="allChecked" [nzIndeterminate]="indeterminate" (ngModelChange)="_checkAll($event)">
          </label>
        </th>
        <th nz-th><span>Title</span></th>
        <th nz-th>
          <span>Type</span>
          <nz-dropdown [nzTrigger]="'click'">
            <i class="anticon anticon-filter" nz-dropdown></i>
            <ul nz-menu>
              <li nz-menu-item>
                <label nz-checkbox>
                  <span>Original</span>
                </label>
              </li>
              <li nz-menu-item>
                <label nz-checkbox>
                  <span>Reprint</span>
                </label>
              </li>
              <li nz-menu-item>
                <label nz-checkbox>
                  <span>Translation</span>
                </label>
              </li>
            </ul>
            <div nz-table-filter>
              <span nz-table-filter-confirm >OK</span>
              <span nz-table-filter-clear >Reset</span>
            </div>
          </nz-dropdown>
        </th>
        <th nz-th>
          <span>Created Time</span>
          <nz-table-sort></nz-table-sort>
        </th>
        <th nz-th>
          <span>Latest modify</span>
          <nz-table-sort></nz-table-sort>
        </th>
        <th nz-th><span>Status</span></th>
        <th nz-th></th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td nzCheckbox>
          <label nz-checkbox [(ngModel)]="data.checked" (ngModelChange)="_refreshStatus($event)">
          </label>
        </td>
        <td nz-td>{{data.title}}</td>
        <td nz-td>{{data.type}}</td>
        <td nz-td>{{data.createdTime}}</td>
        <td nz-td>{{data.latestModify}}</td>
        <td nz-td>
          <nz-tag [nzColor]="'green'">Published</nz-tag>
        </td>
        <td nz-td>
          <a href="#">Edit</a>
        </td>
      </tr>
      </tbody>
    </nz-table>
  `,
  styles: []
})
export class ArticlesTableComponent implements OnInit {

  constructor() { }

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<any> = [];
  operating = false;
  dataSet = [];
  indeterminate = false;

  displayDataChange($event) {
    this.displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this.displayData.forEach(data => data.checked = true);
    } else {
      this.displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this.operating = true;
    setTimeout(_ => {
      this.dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this.operating = false;
    }, 1000);
  }

  ngOnInit() {
    for (let i = 0; i < 46; i++) {
      this.dataSet.push({
        id    : i,
        title   : `Test Title===================================================>${i}`,
        type    : `Type ${i}`,
        createdTime: `2018-05-${i}`,
        latestModify: `2018-05-${i}`,
      });
    }
  }

}
