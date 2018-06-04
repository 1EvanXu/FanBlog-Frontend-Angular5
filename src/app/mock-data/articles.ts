
import { CONTENT_1 } from './articles/article-1';
import { CONTENT_2 } from './articles/article-2';
import { CONTENT_3 } from './articles/article-3';
import { CONTENT_4 } from './articles/article-4';
import { CONTENT_5 } from './articles/article-5';
import { CONTENT_6 } from './articles/article-6';
import {PublishedArticle} from '../data-model/published-article';

const article1 = {
    pubId: 18051701,
    title: 'Stable AngularJS and Long Term Support',
    content: CONTENT_1,
    pubTime: '2018-05-27 15:06',
    type: 'Original',
    category: 'AngularJS',
    visitorCount: 786,
    voteCount: 124,
    commentaryCount: 53,
};

const article2 = {
  pubId: 18051702,
  title: 'Trip report from ng-conf 2018',
  content: CONTENT_2,
  pubTime: '2018-01-27 15:12',
  type: 'Original',
  category: 'ng-cli',
  visitorCount: 1024,
  voteCount: 200,
  commentaryCount: 71,
};

const article3 = {
  pubId: 18051813,
  title: 'The Power of Emotional Decision-Making',
  content: CONTENT_3,
  pubTime: '2018-05-17 14:12',
  type: 'Reproduced',
  category: 'life',
  visitorCount: 204,
  voteCount: 99,
  commentaryCount: 10,
};

const article4 = {
  pubId: 18051936,
  title: 'WebSocket协议深入探究',
  content: CONTENT_4,
  pubTime: '2018-05-17 14:12',
  type: 'Translation',
  category: 'WebSocket',
  visitorCount: 294,
  voteCount: 47,
  commentaryCount: 16,
};

const article5 = {
  pubId: 18051149,
  title: '浅议区块链改变人工智能的可能性',
  content: CONTENT_5,
  pubTime: '2018-05-17 8:50',
  type: 'Original',
  category: '区块链',
  visitorCount: 987,
  voteCount: 137,
  commentaryCount: 19,
};

export const article6 = {
  pubId: 18051256,
  title: '微服务与站点可靠性工程',
  content: CONTENT_6,
  pubTime: '2018-05-17 8:50',
  type: 'Original',
  category: '微服务',
  visitorCount: 357,
  voteCount: 37,
  commentaryCount: 8,
};


export const ARTICLES = [
  PublishedArticle.createInstance(article1),
  PublishedArticle.createInstance(article2),
  PublishedArticle.createInstance(article3),
  PublishedArticle.createInstance(article4),
  PublishedArticle.createInstance(article5),
  PublishedArticle.createInstance(article6)
];

export function findArticleByPubId(pubId: number) {
  for (const index in ARTICLES) {
   if (ARTICLES[index].pubId === pubId) {
    return ARTICLES[index];
   }
  }
}
