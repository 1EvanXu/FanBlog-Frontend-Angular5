import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../services/sidebar.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SideInfoComponent} from '../../components/side-info/side-info.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgZorroAntdModule.forRoot()
      ],
      declarations: [
        SideInfoComponent,
        SidebarComponent
      ],
      providers: [
        SidebarService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
