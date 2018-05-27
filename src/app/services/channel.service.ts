import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class BreadcrumbService {
  private breadcrumbItems = new Subject<string[]>();

  breadcrumbItems$ = this.breadcrumbItems.asObservable();

  setBreadcrumb(breadcrumbItems: string[]) {
    this.breadcrumbItems.next(breadcrumbItems);
  }
}

@Injectable()
export class ReplyService {
  private info = new Subject<{ parentCommentary: number; replyTo: {id: number; name: string}}>();
  info$ = this.info.asObservable();
  setInfo(info: { parentCommentary: number; replyTo: {id: number; name: string}}) {
    this.info.next(info);
  }
}
