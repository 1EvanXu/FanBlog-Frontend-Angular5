import {
  ArticlesManagementListItem,
  ManagementOperationResult, QueryFilter,
} from '../../../data-model/management';
import {ManagementService} from '../../../services/management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleStatus} from '../../../data-model/draft';

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
  readonly pageSize = 6;
  protected _dataSet = [];
  protected articlesOperation: {state: ArticleStatus; info: string};

  protected constructor(public _managementService: ManagementService, public _nzMessageService: NzMessageService) {
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


  pageIndexChange(pageIndex: number) {
    this.loadDataSet(pageIndex, this.filter);
  }

  search(orderField?: string, order?: 'ascend' | 'descend' | null) {

    if (orderField) {
      this.filter.orderField = orderField;
    }
    switch (order) {
      case 'ascend': this.filter.order = 'Asc'; break;
      case 'descend': this.filter.order = 'Desc'; break;
      default: this.filter.order = null;
    }
    this.loadDataSet(1, this.filter);
  }


  resetRadioFilter() {
    this.resetRadioField();
    this.loadDataSet(1, this.filter);
  }

  operate() {
    this.operating = true;
    console.log(this.checkedArticleIds);
    this._managementService.updateDraftsStatus(this.checkedArticleIds, this.articlesOperation.state).subscribe(
      (value: ManagementOperationResult) => {
        if (value === ManagementOperationResult.Success) {
          this._nzMessageService.success(`${this.articlesOperation.info} success!`);
        } else {
          this._nzMessageService.error(`${this.articlesOperation.info} failed!`);
        }
      },
      () => {
          this._nzMessageService.error(`Failed to ${this.articlesOperation.info}`);
          this.operating = false;
          this.loadingData = false;
        },
      () => {
        this.operating = false;
        this.loadDataSet(1);
      }
    );
  }


  abstract initArticlesOperation();

  abstract get dataSet(): Array<ArticlesManagementListItem>;

  abstract resetRadioField();

  abstract loadDataSet(pageIndex: number, filter?: QueryFilter);

}
