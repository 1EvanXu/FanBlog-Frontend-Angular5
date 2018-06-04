
export abstract class ArticlesManagementComponent {

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
  protected constructor() { }

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

  abstract getDataSet(pageIndex: number);
}

