import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  // set default news category as 'topstories'
  private default = 'topstories';
  private newsItems$: Observable<object>;
  public category: string;
  public newsItems: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    // obtain current category for displaying
    this.route.queryParams.subscribe(params => {
      // clear previous news items
      this.newsItems = [];
      // ensure that current query parameter 'category' is not undefined
      if (typeof params.category === 'string') {
        this.category = params.category;
      } else {
        this.category = this.default;
      }
      console.log('Current category is ' + this.category);
      this.newsItems$ = this.api.getNewsForPage(this.category, 1, 20);
      this.newsItems$.subscribe(
        data => {
          console.log(data);
          this.newsItems.push(data);
        }, error => {
          console.log(error);
      });
    });
  }

}
