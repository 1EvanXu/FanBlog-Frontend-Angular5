import {ArticleContentService} from './article-content.service';

describe('ArticleContentService', () => {
  let service: ArticleContentService;
  beforeEach(() => {
    service = new ArticleContentService();
  });

  it('#loadArticleContent should return null', (done: DoneFn) => {
    service.loadArticleContent(0).subscribe(value => {
      expect(value).not.toBeDefined();
      done();
    });
  });

  it('#loadArticleContent should return an Observable object of Article type', (done: DoneFn) => {
    service.loadArticleContent(18051149).subscribe(value => {
      expect(typeof value).toBe('object');
      expect(value.pubId).toBeDefined();
      expect(value.title).toBeDefined();
      expect(value.type).toBeDefined();
      expect(value.content).toBeDefined();
      expect(value.category).toBeDefined();
      expect(value.pubTime).toBeDefined();
      expect(value.visitorCount).toBeDefined();
      expect(value.voteCount).toBeDefined();
      done();
    });
  });
});
