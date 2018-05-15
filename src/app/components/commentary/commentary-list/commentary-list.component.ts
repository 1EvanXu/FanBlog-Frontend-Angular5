import { Component, OnInit } from '@angular/core';
import {Commentary} from '../../../entities/commentary';

@Component({
  selector: 'app-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.css']
})
export class CommentaryListComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  commentaries: Commentary[];
  currentPage = 1;
  numberOfAllCommentaries: number;
  private readonly NUMBER_OF_ITEMS_PER_PAGE = 10;
  constructor() { }

  ngOnInit() {
  }
  get showPagination(): boolean {
    if (this.numberOfAllCommentaries) {
      return this.numberOfAllCommentaries > this.NUMBER_OF_ITEMS_PER_PAGE;
    }
    return false;
  }

}
