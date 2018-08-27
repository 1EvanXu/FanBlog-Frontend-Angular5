import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comment-alert',
  template: `
    <div class="comment-alert" [hidden]="!showAlert" >
      <span [ngStyle]="textStyle">
        <i [ngClass]="alertIcon"></i>
        &nbsp;{{message}}
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
  alertType: 'success'|'failed'|'warning';
  @Input()
  showAlert: boolean;
  @Input() alertMessage: string;
  get textStyle() {
    let textColor;
    switch (this.alertType) {
      case 'success': textColor = 'green'; break;
      case 'failed': textColor = 'red'; break;
      case 'warning': textColor = 'orange'; break;
      case defaultStatus: textColor = 'gray';
    }
    return {'color': textColor};
  }
  get alertIcon() {
    return {
      'anticon': true,
      'anticon-check-circle-o': this.alertType === 'success',
      'anticon-close-circle-o': this.alertType === 'failed',
      'anticon-exclamation-circle-o': this.alertType === 'warning',
    };
  }
  get message(): string {
    if (this.alertMessage && this.alertMessage.length > 7) {
      return this.alertMessage;
    }
    let message;
    switch (this.alertType) {
      case 'success': message = 'Comment success!'; break;
      case 'failed': message = 'Comment failed!'; break;
      case defaultStatus: message = 'gray';
    }
    return message;
  }
}
