import {Component, Input, OnInit} from '@angular/core';
import {ArticleItem} from '../../entities/article-item';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() articleItem: ArticleItem;

  constructor() { }

  ngOnInit() {
  }

}
