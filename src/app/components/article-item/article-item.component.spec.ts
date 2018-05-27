import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleItemComponent } from './article-item.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {By} from '@angular/platform-browser';
import {RouterLinkDirectiveStub} from '../../../testing/router-link-directive-stub';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;
  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ArticleItemComponent, RouterLinkDirectiveStub]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
