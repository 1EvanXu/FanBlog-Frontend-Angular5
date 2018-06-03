import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-management',
  template: `
    <div>
      <h3 style="border-left: deepskyblue 3px solid; margin-bottom: 10px"><span style="margin-left: 10px">Articles Management</span></h3>
      <nz-tabset>
        <nz-tab>
          <ng-template #nzTabHeading>
            All
          </ng-template>
        </nz-tab>
        <nz-tab>
          <ng-template #nzTabHeading>
            Published
          </ng-template>
          <span>content</span>
        </nz-tab>
        <nz-tab>
          <ng-template #nzTabHeading>
            Draft
          </ng-template>
          <span>content</span>
        </nz-tab>
        <nz-tab>
          <ng-template #nzTabHeading>
            Deleted
          </ng-template>
          <span>content</span>
        </nz-tab>
      </nz-tabset>
    </div>
  `,
  styles: []
})
export class ArticlesManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
