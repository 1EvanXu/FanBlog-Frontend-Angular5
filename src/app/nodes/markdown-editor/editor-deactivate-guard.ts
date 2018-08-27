import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {CanComponentDeactivate} from '../../components/common/can-component-deactivate';
import {Observable} from 'rxjs/Observable';
import {MarkdownEditorComponent} from './markdown-editor.component';
import {NzModalService} from 'ng-zorro-antd';

@Injectable()
export class EditorDeactivateGuard implements CanDeactivate<MarkdownEditorComponent> {

  constructor(private _nzModalService: NzModalService) {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    const canLeave = component.canDeactivate();
    if (!canLeave) {

      this._nzModalService.confirm({
        title: 'Warning',
        content: 'The content in editor haven\'t saved! Please save first!',
        okText: 'OK',
        cancelText: 'Just Go',
        onCancel: () => location.href = '/blog/management/'
      });
      return false;
    }
    return true;
  }



}
