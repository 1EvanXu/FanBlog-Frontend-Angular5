import {
  ArticlesManagementList, ArticlesManagementListItem,
  ListFilter,
  ManagementOperationResult,
} from '../../../data-model/management';
import {ManagementService} from '../../../services/management.service';
import {delay} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs/Observable';
import {ArticleStatus} from '../../../data-model/article';

export abstract class ArticlesManagementComponent {

  filter?: ListFilter;
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  indeterminate = false;
  loadingData = false;
  operating = false;
  totalNumberOfItems: number;
  checkedArticleIds = [];
  protected articlesManagementListGetter: (pageIndex: number, filter?: ListFilter) => Observable<ArticlesManagementList>;
  readonly pageSize = 10;
  protected _dataSet = [];
  protected articlesOperation: {state: ArticleStatus; info: string};

  protected constructor(public _managementService: ManagementService, public _nzMessageService: NzMessageService) {
    this.initArticlesManagementListGetter();
    this.initArticlesOperation();
  }

  get shouldPagination(): boolean {
    return this.totalNumberOfItems > this.pageSize;
  }

  refreshCheckStatus() {
    const allChecked = this._dataSet.every(value => value.checked === true);
    const allUnChecked = this._dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this._dataSet.some(value => value.checked);
    this.checkedArticleIds = this._dataSet.filter(value => value.checked).map(value => value.id);
    this.checkedNumber = this.checkedArticleIds.length;
  }

  checkAll(value) {
    if (value) {
      this._dataSet.forEach(data => data.checked = true);
    } else {
      this._dataSet.forEach(data => data.checked = false);
    }
    this.refreshCheckStatus();
  }

  loadDataSet(pageIndex: number, filter?: ListFilter) {
    this.loadingData = true;
    this.articlesManagementListGetter(pageIndex, filter)
      .pipe(delay(1000)).subscribe(
      (value: ArticlesManagementList) => {
        this._dataSet = value.items;
        this.totalNumberOfItems = value.totalNumberOfItems;
        this.refreshCheckStatus();
      },
      () => {
      },
      () => this.loadingData = false
    );
  }

  pageIndexChange(pageIndex: number) {
    this.loadDataSet(pageIndex, this.filter);
  }

  search(timeFilterType?: 'createdTime' | 'latestModify' | 'pubTime' | null, timeFilterOrder?: 'ascend' | 'descend' | null) {
    if (timeFilterType) {
      this.filter.timeFilterType = timeFilterType;
    }
    this.filter.timeFilterOrder = timeFilterOrder;
    this.loadDataSet(1, this.filter);
  }

  resetArticleTypeFilter() {
    this.filter.articleTypeFilter = null;
    this.loadDataSet(1);
  }

  operate() {
    this.operating = true;
    this._managementService.updateArticlesStatus(this.checkedArticleIds, this.articlesOperation.state).pipe(delay(1000)).subscribe(
      (value) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success(`${this.articlesOperation.info} success!`);
        } else {
          this._nzMessageService.error(`${this.articlesOperation.info} failed!`);
        }
      },
      () => this._nzMessageService.error('Some errors happened!'),
      () => {
        this.operating = false;
        this.loadDataSet(1);
      }
    );
  }

  abstract initArticlesManagementListGetter();

  abstract initArticlesOperation();

  abstract get dataSet(): Array<ArticlesManagementListItem>;

}
