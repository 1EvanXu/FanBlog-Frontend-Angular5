import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './nodes/error/error.component';
import {NgModule} from '@angular/core';
import {BlogComponent} from './nodes/blog/blog.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent,
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
