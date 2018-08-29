import { Component, OnInit } from '@angular/core';
import {BASE_API_URL} from '../../../apis/common-api.config';

@Component({
  template: `
    <div nz-row style="margin-bottom: 10px">
      <nz-upload nzAction="{{UPLOAD_URL}}" (nzChange)="handleChange($event)" [nzListType]="'picture'"
                   [nzFileType]="IMAGE_FILE_TYPE" [nzSize]="MAX_FILE_SIZE" >
        <button nz-button>
          <i class="anticon anticon-upload"></i><span>Upload</span>
        </button>
      </nz-upload>
    </div>
    <div nz-row>
      <nz-input [(ngModel)]="imageLink">
        <ng-template #addOnAfter>
          <span style="cursor: pointer" >Copy Link by hand</span>
        </ng-template>
      </nz-input>
    </div>
  `,
  styles: []
})
export class ImageUploadModalComponent implements OnInit {
  readonly UPLOAD_URL = `${BASE_API_URL}/resources/images`;
  readonly IMAGE_FILE_TYPE = 'image/png,image/jpeg,image/gif,image/jpg';
  readonly MAX_FILE_SIZE = 5120;
  imageLink: string;

  constructor() { }

  ngOnInit() {
  }

  handleChange(info): void {
    const response = info.file.response;
    if (response) {
      this.imageLink = response.url;
    }
  }

}
