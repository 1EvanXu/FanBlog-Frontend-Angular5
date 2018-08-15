import {ArticleCategory, ArticleType} from './article';

export  class PublishedArticle {
  pubId: number;
  title: string;
  pubTime: string | Date;
  type: ArticleType;
  category: string;
  visitorCount: number;
  voteCount: number;
  content: string;


  constructor(pubId: number, title: string, pubTime: string, type: ArticleType, category: string,
              visitorCount: number, voteCount: number, content: string) {
    this.pubId = pubId;
    this.title = title;
    this.pubTime = pubTime;
    this.type = type;
    this.category = category;
    this.visitorCount = visitorCount;
    this.voteCount = voteCount;
    this.content = content;
  }
  public static createInstance(object: Object): PublishedArticle {
    return new PublishedArticle(
      object['pubId'],
      object['title'],
      object['pubTime'],
      object['type'],
      object['category'],
      object['visitorCount'],
      object['voteCount'],
      object['content'],
    );
  }
}

export class PublishingArticle {
  title: string;
  type: ArticleType;
  category: ArticleCategory;
  articleId: number;
}
