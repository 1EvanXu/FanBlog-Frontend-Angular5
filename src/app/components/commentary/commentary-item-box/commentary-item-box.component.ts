import {Component, OnInit, Input} from '@angular/core';
import {Commentary} from '../../../data-model/commentary';

@Component({
  selector: 'app-commentary-item-box',
  template: `
  <div style="padding: 5px;">
    <app-commentary-item [commentary]="commentary"></app-commentary-item>
    <app-commentary-item *ngFor="let c of commentary.childCommentaries" [commentary]="c" [isChildCommentary]="hasChildren">
    </app-commentary-item>
  </div>
  `,
  styles: []
})
export class CommentaryItemBoxComponent implements OnInit {
  private _commentary: Commentary;
  hasChildren = false;
  constructor() {}

  ngOnInit(): void {
    // console.log('CommentaryItemBoxComponent======.', this.commentary);
    // console.log('hasChild', this.hasChildren);
  }
  get commentary(): Commentary {
    return this._commentary;
  }
  @Input()
  set commentary(value: Commentary) {
    this._commentary = value;
    if (this._commentary.childCommentaries !== undefined && this._commentary.childCommentaries !== null) {
      this.hasChildren = true;
    }
  }
}
