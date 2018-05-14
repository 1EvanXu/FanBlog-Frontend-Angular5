import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryListComponent } from './commentary-list.component';

describe('CommentaryListComponent', () => {
  let component: CommentaryListComponent;
  let fixture: ComponentFixture<CommentaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaryListComponent ]
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
