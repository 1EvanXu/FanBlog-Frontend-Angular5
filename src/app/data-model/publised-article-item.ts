import {ArticleType} from './article';
import {ItemCollection} from './item-collection';

export class PublishedArticleItem {
  pubId: number;
  title: string;
  articleAbstract: string;
  pubTime: string;
  type: ArticleType;
  category: string;
  visitorCount: number;
  voteCount: number;
  commentaryCount: number;

  constructor(
    pubId: number,
    title: string,
    abstract: string,
    pubTime: string,
    type: ArticleType,
    category: string,
    visitorCount: number,
    voteCount: number,
    commentaryCount: number) {
    this.pubId = pubId;
    this.title = title;
    this.articleAbstract = abstract;
    this.pubTime = pubTime;
    this.type = type;
    this.category = category;
    this.visitorCount = visitorCount;
    this.voteCount = voteCount;
    this.commentaryCount = commentaryCount;
  }
  public static createInstance(object: Object): PublishedArticleItem {
    return new PublishedArticleItem(
      object['pubId'],
      object['title'],
      object['abstract'],
      object['pubTime'],
      object['type'],
      object['category'],
      object['visitorCount'],
      object['voteCount'],
      object['commentaryCount'],
    );
  }
}

export class PublishedArticleItemCollection implements ItemCollection {
  totalNumberOfItems: number;
  items: PublishedArticleItem[];
}

