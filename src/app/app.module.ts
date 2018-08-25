
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './nodes/error/page-not-found.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {BlogModule} from './nodes/blog/blog.module';
import {ManagementModule} from './nodes/management/management.module';
import {MarkdownEditorModule} from './nodes/markdown-editor/markdown-editor.module';
import { HumanizationPipe } from './components/pipes/humanization.pipe';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './nodes/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {RequestErrorHandlerService} from './services/request-error-handler.service';


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
    BlogModule,
    ManagementModule,
    MarkdownEditorModule,
    AppRoutingModule,
  ],
  providers: [UserService, AuthGuardService, AuthService, RequestErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
