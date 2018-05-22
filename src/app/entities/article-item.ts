export interface ArticleItem {
  pubId: number;
  title: string;
  abstract: string;
  pubTime: Date;
  type: string;
  category: string;
  visitorCount: number;
  voteCount: number;
  commentaryCount: number;
  link?: string;
}

