import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  template: `
    <app-article-content></app-article-content>
    <app-comment></app-comment>
    <app-commentary-list></app-commentary-list>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
