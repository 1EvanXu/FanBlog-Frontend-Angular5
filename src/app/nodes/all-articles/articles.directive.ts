import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appArticleList]'
})
export class ArticlesDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
