import { NgModule } from '@angular/core';
import {IpQueryComponent} from './ip-query.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Routes, RouterModule} from '@angular/router';
import {IpQueryService} from '../../services/ip-query.service';
import {IpQueryApiClient} from '../../apis/ip-query.api.service';

const ipQueryRoute: Routes = [
  {
    path: 'ip-query',
    component: IpQueryComponent
  }
];

@NgModule({
  declarations: [
    IpQueryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NoopAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forChild(ipQueryRoute)
  ],
  providers: [IpQueryService, IpQueryApiClient],
  exports: [RouterModule]
})
export class IpQueryModule { }
