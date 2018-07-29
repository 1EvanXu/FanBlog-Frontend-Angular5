import {User} from './user';
import {ItemCollection} from './item-collection';

export interface CommonCommentary {
  commentaryId: number;
  commentTime: string;
  commentator: User;
  commentaryContent: string;
  belongedPublishedArticle: number;
}

export class Commentary implements CommonCommentary {
  commentaryId: number;
  commentator: User;
  commentTime: string;
  commentaryContent: string;
  childCommentaries: Array<ChildCommentary>;
  belongedPublishedArticle: number;
  constructor(
    commentaryId: number,
    commentator: User,
    commentTime: string,
    commentaryContent: string,
    childCommentaries: ChildCommentary[]) {

    this.commentaryId = commentaryId;
    this.commentTime = commentTime;
    this.commentator = commentator;
    this.commentaryContent = commentaryContent;
    this.childCommentaries = childCommentaries;
  }
}

export class ChildCommentary implements CommonCommentary {
  parentCommentary: number;
  commentaryId: number;
  commentTime: string;
  commentator: User;
  commentaryContent: string;
  replyTo?: User;
  belongedPublishedArticle: number;


  constructor(parentCommentary: number, commentaryId: number, commentator: User, commentTime: string,
              commentaryContent: string, replyTo?: User) {
    this.parentCommentary = parentCommentary;
    this.commentaryId = commentaryId;
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
  parent?: number;
  replyTo?: number;
  commentator: string;
  content: string;
}
