import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Commentary} from '../../../entities/commentary';
import {CommentaryService} from '../../../services/commentary.service';
import {CommentariesDirective} from '../commentaries.directive';

@Component({
  selector: 'app-commentary-list',
  template: `
    <app-commentary-item-box *ngFor="let c of commentaries" [commentary]="c"></app-commentary-item-box>
  `,
  styles: []
})
export class CommentaryListComponent implements OnInit {
  commentaries: Commentary[];
  constructor() {
  }
  ngOnInit() {
    // console.log('CommentaryListComponent========>', this.commentaries);
  }
}
