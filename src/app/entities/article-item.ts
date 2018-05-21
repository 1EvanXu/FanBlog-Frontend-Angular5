export class ArticleItem {
  private readonly _title: string;
  private readonly _type: string;
  private readonly _category: string;
  private readonly _abstract: string;
  private readonly _pubTime: string;
  private readonly _link: string;
  private readonly _votesCount: number;
  private readonly _visitorsCount: number;
  private readonly _commentariesCount: number;

  constructor(
      title: string, type: string,
      category: string, abstract: string,
      pubTime: string, link: string,
      votesCount: number,
      visitorsCount: number,
      commentariesCount: number) {
    this._title = title;
    this._type = type;
    this._category = category;
    this._abstract = abstract;
    this._pubTime = pubTime;
    this._link = link;
    this._votesCount = votesCount;
    this._visitorsCount = visitorsCount;
    this._commentariesCount = commentariesCount;
  }


  get title(): string {
    return this._title;
  }

  get type(): string {
    return this._type;
  }

  get category(): string {
    return this._category;
  }

  get abstract(): string {
    return this._abstract;
  }

  get pubTime(): string {
    return this._pubTime;
  }

  get link(): string {
    return this._link;
  }

  get votesCount(): number {
    return this._votesCount;
  }

  get visitorsCount(): number {
    return this._visitorsCount;
  }

  get commentariesCount(): number {
    return this._commentariesCount;
  }
}
