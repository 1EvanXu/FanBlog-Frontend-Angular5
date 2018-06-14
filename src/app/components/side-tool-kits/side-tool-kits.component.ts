import {Component, Input, OnInit} from '@angular/core';
import {ArticleContentService} from '../../services/article-content.service';

@Component({
  selector: 'app-side-tool-kits',
  template: `
    <nz-affix>
      <div class="side-tools-container">
        <div class="button-container">
          <button nz-button [nzType]="'default'" [nzShape]="'circle'" (click)="vote()">
            <i [ngClass]="voteButtonClass"></i>
          </button>
        </div>
        <div class="button-container">
          <button nz-button [nzType]="'default'" [nzShape]="'circle'">
            <i class="anticon anticon-message"></i>
          </button>
        </div>
        <div class="back-top-container">
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
    .side-tools-container {
      padding: 3px;
      margin-top: 200px
    }
    .button-container {
      margin-bottom: 8px
    }
    .back-top-container {
      margin-top: 60px
    }
  `]
})
export class SideToolKitsComponent {
  @Input() pubId: number;
  @Input() voted: boolean;
  constructor(private _articleContentService: ArticleContentService) { }

  vote() {
    if (!this.voted) {
      this._articleContentService.vote(this.pubId).subscribe(
        result => this.setVoted(result),
    );
    }
  }

  private setVoted(result: boolean) {
    this.voted = result;
  }

  get voteButtonClass() {
    return  {
      'anticon': true,
      'anticon-like-o': !this.voted,
      'anticon-like': this.voted
    };
  }
}
