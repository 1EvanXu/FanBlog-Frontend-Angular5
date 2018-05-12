import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideInfoCategoryComponent } from './side-info-category.component';

describe('SideInfoCategoryComponent', () => {
  let component: SideInfoCategoryComponent;
  let fixture: ComponentFixture<SideInfoCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideInfoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideInfoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
