export class SideInformation {
  title: string;
  link: string;
  score?: number;

  constructor(title: string, link: string, score?: number) {
    this.title = title;
    this.link = link;
    this.score = score;
  }
}

