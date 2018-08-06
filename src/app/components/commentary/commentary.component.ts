import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {CommentaryService} from '../../services/commentary.service';
import {CommentariesDirective} from './commentaries.directive';
import {Commentary} from '../../data-model/commentary';
import {CommentaryListComponent} from './commentary-list/commentary-list.component';

@Component({
  selector: 'app-commentary',
  template: `
    <div class="commentary-container">
      <div class="commentary-container-header">
        <h1>Commentaries<small>Total {{numberOfAllCommentaries}} items</small></h1>
      </div>
      <!-- commentary items begin -->
      <ng-template appCommentaries></ng-template>
      <!-- commentary items end -->
      <div class="pagination" [ngStyle]="{'display': showPagination ? '':'none'}">
        <nz-pagination [(nzPageIndex)]="currentPage"
                       [nzTotal]="numberOfAllCommentaries"
                       [nzPageSize]="NUMBER_OF_ITEMS_PER_PAGE"
                       [nzSize]="'small'" (nzPageIndexChange)="pageChange()"
                       ></nz-pagination>
      </div>
    </div>
  `,
  styles: [
    `
      .commentary-container {
      display: block;
      padding: 5px;
      background-color: white;
      margin: 10px 1px 1px 1px
      }
      .commentary-container-header {
        padding: 8px; border-bottom: aliceblue solid 1px
      }
      small {
        margin-left: 20px;color: gray;font-size: 10px;
      }
      .pagination {
        border-top: aliceblue solid 1px;text-align: center;padding: 8px;
      }
    `
  ],
})
export class CommentaryComponent implements OnInit {

  @Input()
  pubId: number;
  @ViewChild(CommentariesDirective) directive: CommentariesDirective;
  commentaries: Commentary[];
  currentPage = 1;
  numberOfAllCommentaries: number;
  readonly NUMBER_OF_ITEMS_PER_PAGE = 8;
  constructor(private service: CommentaryService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadCommentaryList(this.currentPage);
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
    // console.log('Invoke loadCommentaryList()');
    this.service.loadCommentaries(this.pubId, page).subscribe(
      cs => { this.commentaries = cs.items; this.numberOfAllCommentaries = cs.totalNumberOfItems; },
      (error) => { console.log('Errors happened:', error); },
      () => { this.loadComponent(); }
    );
  }

  pageChange() {
    this.loadCommentaryList(this.currentPage);
  }
}
