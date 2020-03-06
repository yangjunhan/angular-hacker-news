import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() index: number;
  @Input() title: string;
  @Input() by: string;
  @Input() url: string;
  @Input() time: string;
  @Input() score: number;
  @Input() comments: number;

  constructor() { }

  ngOnInit(): void {
  }

  openLink() {
    if (this.url) {
      window.open(this.url);
    }
  }
}
