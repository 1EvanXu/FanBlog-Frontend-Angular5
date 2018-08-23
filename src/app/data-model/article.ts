import {ArticleCategory, ArticleType} from './draft';

export  class Article {
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
}

export class TempArticle {
  title: string;
  type: ArticleType;
  category: ArticleCategory;
  draftId: number;
}
