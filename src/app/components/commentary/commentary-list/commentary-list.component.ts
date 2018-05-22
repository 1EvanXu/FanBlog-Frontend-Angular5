import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Commentary} from '../../../entities/commentary';
import {CommentaryService} from '../../../services/commentary.service';
import {CommentariesDirective} from '../commentaries.directive';

@Component({
  selector: 'app-commentary',
  template: `
    <div style="
      display: block;
      padding: 5px;
      background-color: white;
      margin: 10px 1px 1px 1px
     ">
      <div style="padding: 8px; border-bottom: aliceblue solid 1px">
        <h1>Commentaries<small style="margin-left: 20px;color: gray;font-size: 10px;">Total {{numberOfAllCommentaries}} items</small></h1>
      </div>
      <!-- commentary items begin -->
      <ng-template appCommentaries></ng-template>
      <!-- commentary items end -->
      <div [hidden]="false" style="border-top: aliceblue solid 1px;text-align: center;padding: 8px;">
        <nz-pagination [(nzPageIndex)]="currentPage"
                       [nzTotal]="numberOfAllCommentaries"
                       [nzPageSize]="NUMBER_OF_ITEMS_PER_PAGE"
                       [nzSize]="'small'" (nzPageIndexChange)="pageChange()"></nz-pagination>
      </div>
    </div>
  `,
  styles: [],
})
export class CommentaryComponent implements OnInit {

  @Input()
  pubId: number;
  @ViewChild(CommentariesDirective) directive: CommentariesDirective;
  commentaries: Commentary[];
  currentPage = 1;
  numberOfAllCommentaries: number;
  readonly NUMBER_OF_ITEMS_PER_PAGE = 10;
  constructor(private service: CommentaryService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadCommentaryList(this.currentPage);
    console.log(this.commentaries[0].commentator);
    this.numberOfAllCommentaries = 50;
    // this.loadCommentaryListComponent();
  }
  get showPagination(): boolean {
    if (this.numberOfAllCommentaries) {
      return this.numberOfAllCommentaries > this.NUMBER_OF_ITEMS_PER_PAGE;
    }
    return false;
  }
  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CommentaryListComponent);
    const viewContainerRef = this.directive.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<CommentaryListComponent>componentRef.instance).commentaries = this.commentaries;
  }
  loadCommentaryList(page: number) {
    this.service.loadCommentaries(this.currentPage).subscribe(
      cs => { this.commentaries = cs; },
      (error) => { console.log('Errors happened:', error); },
      () => { this.loadComponent(); }
    );
  }
  pageChange() {
    this.loadCommentaryList(this.currentPage);
  }
}

@Component({
  selector: 'app-commentary-list',
  template: `
    <app-commentary-box *ngFor="let c of commentaries" [commentary]="c"></app-commentary-box>
  `,
  styles: []
})
export class CommentaryListComponent implements OnInit {
  commentaries: Commentary[];
  constructor() {
  }
  ngOnInit() {
    console.log('CommentaryListComponent========>', this.commentaries);
  }
}
