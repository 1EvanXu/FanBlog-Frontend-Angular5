import {User} from './user';
import {ItemCollection} from './item-collection';

export interface CommonCommentary {
  id: number;
  commentTime: string;
  commentator: User;
  commentaryContent: string;
  belongedPublishedArticle: number;
}

export class Commentary implements CommonCommentary {
  id: number;
  commentator: User;
  commentTime: string;
  commentaryContent: string;
  childCommentaries: Array<ChildCommentary>;
  belongedPublishedArticle: number;
  constructor(
    id: number,
    commentator: User,
    commentTime: string,
    commentaryContent: string,
    childCommentaries: ChildCommentary[]) {

    this.id = id;
    this.commentTime = commentTime;
    this.commentator = commentator;
    this.commentaryContent = commentaryContent;
    this.childCommentaries = childCommentaries;
  }
}

export class ChildCommentary implements CommonCommentary {
  parentCommentary: number;
  id: number;
  commentTime: string;
  commentator: User;
  commentaryContent: string;
  replyTo?: User;
  belongedPublishedArticle: number;


  constructor(parentCommentary: number, id: number, commentator: User, commentTime: string,
              commentaryContent: string, replyTo?: User) {
    this.parentCommentary = parentCommentary;
    this.id = id;
    this.commentTime = commentTime;
    this.commentator = commentator;
    this.commentaryContent = commentaryContent;
    this.replyTo = replyTo;
  }
}

export class CommentaryCollection implements ItemCollection {
  items: Array<Commentary>;
  totalNumberOfItems: number;

}

export class Comment {
  commentator: number;
  content: string;
  parent?: number;
  replyTo?: number;


}
