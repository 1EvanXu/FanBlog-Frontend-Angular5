import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryItemComponent } from './commentary-item.component';

describe('CommentaryItemComponent', () => {
  let component: CommentaryItemComponent;
  let fixture: ComponentFixture<CommentaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
