import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CommentaryComponent, CommentaryListComponent} from './commentary-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommentaryBoxComponent, CommentaryItemComponent} from '../commentary-box/commentary-box.component';

describe('CommentaryListComponent', () => {
  let component: CommentaryListComponent;
  let fixture: ComponentFixture<CommentaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgZorroAntdModule.forRoot()],
      declarations: [ CommentaryListComponent, CommentaryComponent, CommentaryBoxComponent, CommentaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
