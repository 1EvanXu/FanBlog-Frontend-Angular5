export  class Article {
  pubId: number;
  title: string;
  pubTime: string;
  type: string;
  category: string;
  visitorCount: number;
  voteCount: number;
  content: string;


  constructor(pubId: number, title: string, pubTime: string, type: string, category: string,
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
  public static createInstance(object: Object): Article {
    return new Article(
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
