import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideToolKitsComponent } from './side-tool-kits.component';

describe('SideToolKitsComponent', () => {
  let component: SideToolKitsComponent;
  let fixture: ComponentFixture<SideToolKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideToolKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideToolKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
