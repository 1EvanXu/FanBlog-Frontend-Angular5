import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideInfoComponent} from '../../components/side-info/side-info.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SidebarComponent} from './sidebar.component';
import {SidebarService} from '../../services/sidebar.service';
import {SideInformationApiClient} from '../../apis/side-information.api.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    SideInfoComponent,
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    SidebarService, SideInformationApiClient
  ]
})
export class SidebarModule { }
