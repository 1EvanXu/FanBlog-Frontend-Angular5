import {Component, OnInit, Input, HostListener} from '@angular/core';
import {ChildCommentary, Commentary} from '../../../entities/commentary';

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
    // console.log('CommentaryItemBoxComponent======.', this.commentary.childCommentaries[0]);
    // console.log('hasChild', this.hasChildren);
  }
  get commentary(): Commentary {
    return this._commentary;
  }
  @Input()
  set commentary(value: Commentary) {
    this._commentary = value;
    this.hasChildren = this._commentary.childCommentaries.length !== 0;
  }
}
