import {
  ArticlesManagementList, ArticlesManagementListItem,
  ManagementOperationResult, QueryFilter,
} from '../../../data-model/management';
import {ManagementService} from '../../../services/management.service';
import {delay} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs/Observable';
import {ArticleStatus} from '../../../data-model/article';

export abstract class ArticlesManagementComponent {

  abstract filter: QueryFilter;
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  indeterminate = false;
  loadingData = false;
  operating = false;
  totalNumberOfItems: number;
  checkedArticleIds = [];
  protected articlesManagementListGetter: (pageIndex: number, filter?: QueryFilter) => Observable<ArticlesManagementList>;
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

  loadDataSet(pageIndex: number, filter?: QueryFilter) {
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

  search(orderField?: string, order?: 'Asc' | 'Desc' | null) {
    if (orderField) {
      this.filter.orderField = orderField;
    }
    this.filter.order = order;
    this.loadDataSet(1, this.filter);
  }


  resetRadioFilter() {
    this.resetRadioField();
    this.loadDataSet(1, this.filter);
  }

  operate() {
    this.operating = true;
    console.log(this._managementService);
    this._managementService.updateArticlesStatus(this.checkedArticleIds, this.articlesOperation.state).pipe(delay(1000)).subscribe(
      (value: ManagementOperationResult) => {
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

  abstract resetRadioField();

}
