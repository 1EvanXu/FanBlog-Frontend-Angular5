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
  numberOfAllCommentaries: number;
  constructor() { }

  ngOnInit() {
  }

}
