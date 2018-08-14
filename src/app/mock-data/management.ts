import {ArticleStatus, ArticleType} from '../data-model/article';
import {CategoriesManagementListItem} from '../data-model/management';

export function getCurrentTime() {
  const currentTime = new Date();
  const y = currentTime.getFullYear().toString();
  let m = (currentTime.getMonth() + 1).toString();
  m = m.length === 1 ? '0' + m : m;
  let d = currentTime.getDate().toString();
  d = d.length === 1 ? '0' + d : d;
  let H = currentTime.getHours().toString();
  H = H.length === 1 ? '0' + H : H;
  let M = currentTime.getMinutes().toString();
  M = M.length === 1 ? '0' + M : M;

  return `${y}-${m}-${d} ${H}:${M}`;
}

export function getAllArticlesManagementList(pageIndex: number) {
  const curTime = getCurrentTime();
  const items = [];
  for (let i = (pageIndex - 1) * 10; i < pageIndex * 10; i++) {
    items.push({
      id: i,
      title: `All Articles Management List Item Title - ${i}`,
      type: articleTypes[i % 3],
      createdTime: curTime,
      latestModify: curTime,
      status: articleStatuses[i % 3]
    });
  }
  return {totalNumberOfItems: 50, items: items};
}
export function getPublishedArticlesManagementList(pageIndex: number) {
  const curTime = getCurrentTime();
  const items = [];
  for (let i = (pageIndex - 1) * 10; i < pageIndex * 10; i++) {
    items.push({
      id: i,
      title: `Published Articles Management List Item Title - ${i}`,
      type: articleTypes[i % 3],
      pubTime: curTime,
    });
  }
  return {totalNumberOfItems: 50, items: items};
}
export function getDraftsManagementList(pageIndex: number) {
  const curTime = getCurrentTime();
  const items = [];
  for (let i = (pageIndex - 1) * 10; i < pageIndex * 10; i++) {
    items.push({
      id: i,
      title: `Drafts Management List Item Title - ${i}`,
      createdTime: curTime,
      latestModify: curTime,
    });
  }
  return {totalNumberOfItems: 50, items: items};
}
export function getDeletedArticlesManagementList(pageIndex: number) {
  const items = [];
  for (let i = (pageIndex - 1) * 10; i < pageIndex * 10; i++) {
    items.push({
      id: i,
      title: `Deleted Articles Management List Item Title - ${i}`,
    });
  }
  return {totalNumberOfItems: 50, items: items};
}
export const articleTypes = [ArticleType.Original, ArticleType.Reproduced, ArticleType.Translation];

export const articleStatuses = [ArticleStatus.Editing, ArticleStatus.Deleted, ArticleStatus.Published];

export function getCategoriesManagementList(pageIndex: number) {
  const curTime = getCurrentTime();
  const items: CategoriesManagementListItem[] = [];
  for (let i = (pageIndex - 1) * 10; i < pageIndex * 10; i++) {
    items.push({
      id: i,
      name: `Category-${i}`,
      createdTime: curTime,
      numberOfIncludedArticles: parseInt((Math.random() * 10).toString(), 0)
    });
  }
  return { totalNumberOfItems: 50, items: items };
}
