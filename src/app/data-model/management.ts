import {ArticleStatus, ArticleType} from './article';

export class AllArticlesManagementListItem implements ArticlesManagementListItem {
  id: number;
  title: string;
  type: ArticleType;
  createdTime: string | Date;
  latestModify: string | Date;
  status: ArticleStatus;
}

export class AllArticlesManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: AllArticlesManagementListItem[];
}

export class PublishedArticlesManagementListItem implements ArticlesManagementListItem {
  id: number;
  title: string;
  pubId: number;
  type: ArticleType;
  pubTime: string | Date;
}

export class PublishedArticlesManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: PublishedArticlesManagementListItem[];
}

export class DeletedArticlesManagementListItem implements ArticlesManagementListItem {
  id: number;
  title: string;
}

export class DeletedArticlesManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: DeletedArticlesManagementListItem[];
}

export class DraftsManagementListItem implements ArticlesManagementListItem {
  id: number;
  title: string;
  createdTime: string | Date;
  latestModify: string | Date;
}

export class DraftsManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: DraftsManagementListItem[];
}

export enum ManagementOperationResult {
  Success = 'Success',
  Failed = 'Failed'
}

export class ListFilter {
  timeFilterType: 'createdTime' | 'latestModify' | 'pubTime' | null;
  timeFilterOrder: 'ascend' | 'descend' | null;
  articleTypeFilter: ArticleType;
  constructor() {}
}

export class CategoriesManagementListItem {
  id: number;
  name: string;
  createdTime: string | Date;
  numberOfIncludedArticles = 0;
}

export class CategoriesManagementList {
  totalNumberOfCategories: number;
  items: CategoriesManagementListItem[];
}

export class CategoriesListFilter {
  type = 'createdTime';
  order: 'ascend'|'descend'|null;
  constructor() {}
}

export interface ArticlesManagementList {
  totalNumberOfItems: number;
  items: ArticlesManagementListItem[];
}

export interface ArticlesManagementListItem {
  id: number;
  pubId?: number;
  title: string;
  type?: ArticleType;
  pubTime?: string | Date;
  createdTime?: string | Date;
  latestModify?: string | Date;
  status?: ArticleStatus;
}
