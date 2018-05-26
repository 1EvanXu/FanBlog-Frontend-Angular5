export interface CommonCommentary {
  commentaryId: number;
  commentTime: string;
  commentator: string;
  commentaryContent: string;
}

export class Commentary implements CommonCommentary {
  commentaryId: number;
  commentator: string;
  commentTime: string;
  commentaryContent: string;
  childCommentaries: ChildCommentary[];
  constructor(
    commentaryId: number,
    commentator: string,
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
  commentator: string;
  commentaryContent: string;
  replyTo?: string;


  constructor(parentCommentary: number, commentaryId: number, commentator: string, commentTime: string,
              commentaryContent: string, replyTo?: string) {
    this.parentCommentary = parentCommentary;
    this.commentaryId = commentaryId;
    this.commentTime = commentTime;
    this.commentator = commentator;
    this.commentaryContent = commentaryContent;
    this.replyTo = replyTo;
  }
}

export class Comment {
  parent?: number;
  replyTo?: number;
  commentator: string;
  content: string;
}
