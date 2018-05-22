export interface CommonCommentary {
  commentaryId: number;
  commentator: string;
  commentTime: string;
  commentaryContent: string;
}

export class Commentary implements CommonCommentary {
  commentaryId: number;
  commentTime: string;
  commentator: string;
  commentaryContent: string;
  childCommentaries?: ChildCommentary[];
}

export class ChildCommentary implements CommonCommentary {
  commentaryId: number;
  commentTime: string;
  commentator: string;
  commentaryContent: string;
  replyTo?: string;
}
