import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesManagementComponent } from './articles-management.component';

describe('ArticlesManagementComponent', () => {
  let component: ArticlesManagementComponent;
  let fixture: ComponentFixture<ArticlesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
