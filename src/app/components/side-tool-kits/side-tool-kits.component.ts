import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-tool-kits',
  template: `
    <nz-affix>
      <div style="padding: 3px;margin-top: 200px">
        <div style="margin-bottom: 8px">
          <button nz-button [nzType]="'default'" [nzShape]="'circle'" (click)="vote()">
            <i [ngClass]="{'anticon': true, 'anticon-like-o': !voted, 'anticon-like': voted}"></i>
          </button>
        </div>
        <div style="margin-bottom: 8px">
          <button nz-button [nzType]="'default'" [nzShape]="'circle'">
            <i class="anticon anticon-message"></i>
          </button>
        </div>
        <div style="margin-top: 60px">
          <nz-back-top [nzVisibilityHeight]="100">
            <ng-template #nzTemplate>
              <div class="ant-back-top-inner">
                <i class="anticon anticon-to-top"></i>
              </div>
            </ng-template>
          </nz-back-top>
        </div>
      </div>
    </nz-affix>
  `,
  styles: [`
    :host ::ng-deep .ant-back-top-inner {
      height: 40px;
      width: 40px;
      line-height: 40px;
      border-radius: 50%;
      background-color: #1088e9;
      color: #fff;
      text-align: center;
      font-size: 20px;
    }
    :host ::ng-deep strong {
      color: #1088e9;
    }
    :host ::ng-deep .dispaly-none {
      display: none;
    }
  `]
})
export class SideToolKitsComponent implements OnInit {
  @Input() pubId: number;
  voted = false;
  constructor() { }

  ngOnInit() {
  }
  vote() {
    if (!this.voted) {
      this.voted = true;
    }
  }
}
