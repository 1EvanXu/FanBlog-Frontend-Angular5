export  class Article {
  id: number;
  title: string;
  createdTime: string | Date;
  latestModify: string | Date;
  htmlContent: string;
  markdownContent: string;
  status = ArticleStatus.Editing;
}

export class ArticleCategory {
  id: number;
  name: string;
}

export enum ArticleType {
  Original = 'Original',
  Reproduced = 'Reproduced',
  Translation = 'Translation'
}

export enum ArticleStatus {
  Published = 'Published',
  Editing = 'Editing',
  Deleted = 'Deleted'
}

export class Draft extends Article {
  tempArticleId: number;
}
