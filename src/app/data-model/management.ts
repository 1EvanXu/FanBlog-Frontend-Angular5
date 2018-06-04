import {ArticleStatus, ArticleType} from './article';

export class AllArticlesManagementListItem {
  id: number;
  title: string;
  type: ArticleType;
  createdTime: string | Date;
  latestModify: string | Date;
  status: ArticleStatus;
}

export class AllArticlesManagementList {
  totalNumberOfItems: number;
  items: AllArticlesManagementListItem[];
}

export class PublishedArticlesManagementListItem {
  id: number;
  title: string;
  type: ArticleType;
  pubTime: string | Date;
}

export class PublishedArticlesManagementList {
  totalNumberOfItems: number;
  items: PublishedArticlesManagementListItem[];
}

export class DeletedArticlesManagementListItem {
  id: number;
  title: string;
}

export class DeletedArticlesManagementList {
  totalNumberOfItems: number;
  items: DeletedArticlesManagementListItem[];
}

export class DraftsManagementListItem {
  id: number;
  title: string;
  createdTime: string | Date;
  latestModify: string | Date;
}

export enum ManagementOperationResult {
  Success = 'Success',
  Failed = 'Failed'
}

export class ListFilter {
  timeFilterType: 'createdTime' | 'latestModify' | 'pubTime' | null;
  timeFilterOrder: 'ascend' | 'descend' | null;
  articleTypeFilter: ArticleType;
}

