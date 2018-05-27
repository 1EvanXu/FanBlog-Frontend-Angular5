import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CommentaryListComponent} from './commentary-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommentaryItemBoxComponent} from '../commentary-item-box/commentary-item-box.component';
import {CommentaryItemComponent} from '../commentary-item/commentary-item.component';

describe('CommentaryListComponent', () => {
  let component: CommentaryListComponent;
  let fixture: ComponentFixture<CommentaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgZorroAntdModule.forRoot()],
      declarations: [ CommentaryListComponent, CommentaryItemBoxComponent, CommentaryItemComponent ]
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
