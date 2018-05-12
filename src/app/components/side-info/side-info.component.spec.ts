import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideInfoComponent } from './side-info.component';

describe('SideInfoComponent', () => {
  let component: SideInfoComponent;
  let fixture: ComponentFixture<SideInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
