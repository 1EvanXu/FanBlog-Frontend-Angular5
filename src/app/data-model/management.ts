import {ArticleStatus, ArticleType} from './article';
import {ItemCollection} from './item-collection';

export abstract class ArticlesManagementListItem {
  id: number;
  title: string;
}

export class AllArticlesManagementListItem extends ArticlesManagementListItem {

  type: ArticleType;
  createdTime: string | Date;
  latestModify: string | Date;
  status: ArticleStatus;
}

export class AllArticlesManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: AllArticlesManagementListItem[];
}

export class PublishedArticlesManagementListItem extends ArticlesManagementListItem {

  pubId: number;
  type: ArticleType;
  pubTime: string | Date;
}

export class PublishedArticlesManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: PublishedArticlesManagementListItem[];
}

export class DeletedArticlesManagementListItem extends ArticlesManagementListItem {

}

export class DeletedArticlesManagementList implements ArticlesManagementList {
  totalNumberOfItems: number;
  items: DeletedArticlesManagementListItem[];
}

export class DraftsManagementListItem extends ArticlesManagementListItem {

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

export class CategoriesManagementListItem {
  id: number;
  name: string;
  createdTime: string | Date;
  numberOfIncludedArticles = 0;
}

export class CategoriesManagementList implements ItemCollection {
  totalNumberOfItems: number;
  items: CategoriesManagementListItem[];
}


export interface ArticlesManagementList extends ItemCollection {
  totalNumberOfItems: number;
  items: ArticlesManagementListItem[];
}



export abstract class QueryFilter {
  orderField: string;
  order: 'Desc'|'Asc';

  protected constructor(orderField: string, order: 'Desc'|'Asc') {
    this.orderField = orderField;
    this.order = order;
  }
}

export class ArticleQueryFilter extends QueryFilter {
  status: ArticleStatus;
  constructor(orderField: string, order: 'Desc'|'Asc', status: ArticleStatus) {
    super(orderField, order);
    this.status = status;
  }
}

export class PublishedArticleQueryFilter extends QueryFilter {
  type: ArticleType;
  constructor(orderField: string, order: 'Desc'|'Asc', type: ArticleType) {
    super(orderField, order);
    this.type = type;
  }
}

export class CategoryQueryFilter extends QueryFilter {
  constructor(orderField: string, order: 'Desc'|'Asc') {
    super(orderField, order);
  }
}


