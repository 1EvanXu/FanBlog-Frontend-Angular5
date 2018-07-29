import {Component, OnInit} from '@angular/core';
import {Commentary} from '../../../data-model/commentary';

@Component({
  selector: 'app-commentary-list',
  template: `
    <app-commentary-item-box *ngFor="let c of commentaries" [commentary]="c"></app-commentary-item-box>
  `,
  styles: []
})
export class CommentaryListComponent implements OnInit {
  commentaries: Array<Commentary>;
  constructor() {
  }
  ngOnInit() {
    // console.log('CommentaryListComponent========>', this.commentaries);
  }
}
