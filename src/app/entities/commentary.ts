export interface CommonCommentary {
  commentaryId: number;
  commentator: string;
  commentTime: Date;
  commentaryContent: string;
}

export class Commentary implements CommonCommentary {
  commentTime: Date;
  commentaryId: number;
  commentator: string;
  commentaryContent: string;
  childCommentaries: ChildCommentary[];
}

export class ChildCommentary implements CommonCommentary {
  commentaryId: number;
  commentTime: Date;
  commentator: string;
  commentaryContent: string;
  replyTo: string;
}
