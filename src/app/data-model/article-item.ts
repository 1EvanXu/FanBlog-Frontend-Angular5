import {ArticleType} from './draft';
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
}

export class PublishedArticleItemCollection implements ItemCollection {
  totalNumberOfItems: number;
  items: PublishedArticleItem[];
}

