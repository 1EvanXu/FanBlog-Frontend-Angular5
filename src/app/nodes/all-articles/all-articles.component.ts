import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div style="min-height: 1000px;" nz-col [nzSm]="20" [nzMd]="18">
     <app-articles-list></app-articles-list>
    </div>
  `,
  styles: []
})
export class AllArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
