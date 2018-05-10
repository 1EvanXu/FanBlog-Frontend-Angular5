export class ArticleItem {
  private readonly _title: string;
  private readonly _type: string;
  private readonly _category: string;
  private readonly _abstract: string;
  private readonly _pub_time: string;
  private readonly _link: string;
  private readonly _votes_count: number;
  private readonly _visitors_count: number;
  private readonly _comments_count: number;

  constructor(
      title: string, type: string,
      category: string, abstract: string,
      pub_time: string, link: string,
      votes_count: number,
      visitors_count: number,
      comments_count: number) {
    this._title = title;
    this._type = type;
    this._category = category;
    this._abstract = abstract;
    this._pub_time = pub_time;
    this._link = link;
    this._votes_count = votes_count;
    this._visitors_count = visitors_count;
    this._comments_count = comments_count;
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

  get pub_time(): string {
    return this._pub_time;
  }

  get link(): string {
    return this._link;
  }

  get votes_count(): number {
    return this._votes_count;
  }

  get visitors_count(): number {
    return this._visitors_count;
  }

  get comments_count(): number {
    return this._comments_count;
  }
}
