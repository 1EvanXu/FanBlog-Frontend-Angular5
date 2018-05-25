import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideToolKitsComponent } from './side-tool-kits.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

describe('SideToolKitsComponent', () => {
  let component: SideToolKitsComponent;
  let fixture: ComponentFixture<SideToolKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgZorroAntdModule.forRoot()],
      declarations: [ SideToolKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideToolKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SideToolKitsComponent', () => {
    expect(component).toBeTruthy();
  });
});
