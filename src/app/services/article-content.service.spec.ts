import {ArticleContentService} from './article-content.service';
import { TestBed } from '@angular/core/testing';
import {it} from 'selenium-webdriver/testing';


describe('TestService', () => {
  let service: ArticleContentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleContentService]
    });
    service = TestBed.get(ArticleContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return undefined when pubId not exit', (done: DoneFn) => {
    service.getArticleContent(0).subscribe(value => {
      expect(value).toBeUndefined();
    });
  });

  it('should return an Observable object of Article type', (done: DoneFn) => {
    service.getArticleContent(18051149).subscribe(value => {
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
