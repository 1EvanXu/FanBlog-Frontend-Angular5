import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comment-alert',
  template: `
    <div class="comment-alert" [hidden]="!showAlert" >
      <span [ngStyle]="textStyle">
        <i [ngClass]="alertIcon"></i>
        &nbsp;{{alertMessage}}
      </span>
    </div>
  `,
  styles: [`
    .comment-alert {
      text-align: center; margin-top: 10px
    }
  `]
})
export class CommentAlertComponent {
  @Input()
  alertType: 'success'|'failed';
  @Input()
  showAlert: boolean;
  get textStyle() {
    let textColor;
    switch (this.alertType) {
      case 'success': textColor = 'green'; break;
      case 'failed': textColor = 'red'; break;
      case defaultStatus: textColor = 'gray';
    }
    return {'color': textColor};
  }
  get alertIcon() {
    return {
      'anticon': true,
      'anticon-check-circle-o': this.alertType === 'success',
      'anticon-close-circle-o': this.alertType === 'failed',
    };
  }
  get alertMessage(): string {
    let message;
    switch (this.alertType) {
      case 'success': message = 'Comment success!'; break;
      case 'failed': message = 'Comment failed!'; break;
      case defaultStatus: message = 'gray';
    }
    return message;
  }
}
