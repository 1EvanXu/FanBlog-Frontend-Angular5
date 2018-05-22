import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCommentaries]'
})
export class CommentariesDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
