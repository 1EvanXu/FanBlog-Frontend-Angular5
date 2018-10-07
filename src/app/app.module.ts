
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgZorroAntdModule, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './nodes/error/page-not-found.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {BlogModule} from './nodes/blog/blog.module';
import {ManagementModule} from './nodes/management/management.module';
import {MarkdownEditorModule} from './nodes/markdown-editor/markdown-editor.module';
import { HumanizationPipe } from './components/pipes/humanization.pipe';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './nodes/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {RequestErrorHandlerService} from './services/request-error-handler.service';
import {AuthApiClient} from './apis/auth.api.service';
import { CookieModule } from 'ngx-cookie';
import {IpQueryModule} from './nodes/ip-query/ip-query.module';

const ngMessageConfig = { provide: NZ_MESSAGE_CONFIG, useValue: {
    nzDuration             : 2500,
    nzMaxStack             : 2,
    nzPauseOnHover         : true,
    nzAnimate              : true
  }
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HumanizationPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgZorroAntdModule.forRoot(),
    CookieModule.forRoot(),
    BlogModule,
    IpQueryModule,
    ManagementModule,
    MarkdownEditorModule,
    AppRoutingModule,
  ],
  providers: [AuthGuardService, AuthService, AuthApiClient, RequestErrorHandlerService, ngMessageConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
