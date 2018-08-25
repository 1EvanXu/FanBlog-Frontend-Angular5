import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './nodes/error/page-not-found.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './nodes/login/login.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
