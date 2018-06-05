import {
  AllArticlesManagementList,
  ArticlesManagementType,
  DeletedArticlesManagementList,
  DraftsManagementList,
  ListFilter,
  ManagementOperationResult,
  PublishedArticlesManagementList
} from '../../../data-model/management';
import {ManagementService} from '../../../services/management.service';
import {delay} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';

export abstract class ArticlesManagementComponent {
  articlesManagementType: ArticlesManagementType;
  filter?: ListFilter;
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  dataSet = [];
  indeterminate = false;
  loadingData = false;
  deleting = false;
  totalNumberOfItems: number;
  pageSize = 10;
  checkedArticleIds = [];
  protected constructor(public _managementService: ManagementService, public _nzMessageService: NzMessageService) { }

  get shouldPagination(): boolean {
    return this.totalNumberOfItems > this.pageSize;
  }

  refreshCheckStatus() {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedArticleIds = this.dataSet.filter(value => value.checked).map(value => value.id);
    this.checkedNumber = this.checkedArticleIds.length;
  }

  checkAll(value) {
    if (value) {
      this.dataSet.forEach(data => data.checked = true);
    } else {
      this.dataSet.forEach(data => data.checked = false);
    }
    this.refreshCheckStatus();
  }

  getDataSet(articlesManagementType: ArticlesManagementType, pageIndex: number, filter?: ListFilter) {
    this.loadingData = true;
    switch (articlesManagementType) {
      case ArticlesManagementType.All: this._getAllArticleManagementList(pageIndex, filter); break;
      case ArticlesManagementType.Publised: this._getPublishedArticleManagementList(pageIndex, filter); break;
      case ArticlesManagementType.Draft: this._getDraftsManagementList(pageIndex, filter); break;
      case ArticlesManagementType.Deleted: this._getDeletedArticlesManagementList(pageIndex, filter); break;
    }
  }

  private _getAllArticleManagementList(pageIndex: number, filter?: ListFilter) {
    this._managementService.getAllArticlesManagementList(pageIndex, filter)
      .pipe(delay(1000)).subscribe(
      (value: AllArticlesManagementList) => {
        this.dataSet = value.items;
        this.totalNumberOfItems = value.totalNumberOfItems;
        this.refreshCheckStatus();
      },
      () => {},
      () => this.loadingData = false
    );
  }

  private _getPublishedArticleManagementList(pageIndex: number, filter?: ListFilter) {
    this._managementService.getPublishedArticlesManagementList(pageIndex, filter)
      .pipe(delay(1000)).subscribe(
      (value: PublishedArticlesManagementList) => {
        this.dataSet = value.items;
        this.totalNumberOfItems = value.totalNumberOfItems;
        this.refreshCheckStatus();
      },
      () => {},
      () => this.loadingData = false
    );
  }

  private _getDraftsManagementList(pageIndex: number, filter?: ListFilter) {
    this._managementService.getDraftsManagementList(pageIndex, filter)
      .pipe(delay(1000)).subscribe(
      (value: DraftsManagementList) => {
        this.dataSet = value.items;
        this.totalNumberOfItems = value.totalNumberOfItems;
        this.refreshCheckStatus();
      },
      () => {},
      () => this.loadingData = false
    );
  }

  private _getDeletedArticlesManagementList(pageIndex: number, filter?: ListFilter) {
    this._managementService.getDeletedArticlesManagementList(pageIndex, filter)
      .pipe(delay(1000)).subscribe(
      (value: DeletedArticlesManagementList) => {
        this.dataSet = value.items;
        this.totalNumberOfItems = value.totalNumberOfItems;
        this.refreshCheckStatus();
      },
      () => {},
      () => this.loadingData = false
    );
  }

  pageIndexChange(pageIndex: number) {
    this.getDataSet(this.articlesManagementType, pageIndex, this.filter);
  }

  search(timeFilterType?: 'createdTime'|'latestModify'|'pubTime'|null, timeFilterOrder?: 'ascend'|'descend'|null) {
    if (timeFilterType) {
      this.filter.timeFilterType = timeFilterType;
    }
    this.filter.timeFilterOrder = timeFilterOrder;
    this.getDataSet(this.articlesManagementType, 1, this.filter);
  }

  resetArticleTypeFilter() {
    this.filter.articleTypeFilter = null;
    this.getDataSet(this.articlesManagementType, 1);
  }


  deleteArticles() {
    this.deleting = true;
    this._managementService.deleteArticles(this.checkedArticleIds).pipe(delay(1000)).subscribe(
      (value) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success('Delete success!');
        } else {
          this._nzMessageService.error('Delete failed!');
        }
      },
      () => this._nzMessageService.error('Some errors happened!'),
      () => { this.deleting = false; this.getDataSet(this.articlesManagementType, 1); }
    );
  }
}
