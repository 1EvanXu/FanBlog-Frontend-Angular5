import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {ArticlesModule} from './nodes/articles/articles.module';
import {ArticleModule} from './nodes/article/article.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SidebarModule} from './nodes/sidebar/sidebar.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './nodes/error/page-not-found.component';
xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageNotFoundComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        NgZorroAntdModule.forRoot(),
        ArticlesModule,
        ArticleModule,
        SidebarModule,
        RouterModule
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
