import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  // set default news category as 'topstories'
  private default = 'topstories';
  private newsItems$: Observable<object>;
  private subscription: Subscription;
  public category: string;
  public newsItems: Array<object>;
  public pageNum: number;
  public totalPage: number;
  public pageSize: number;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    this.pageSize = 20;
    // obtain current category for displaying
    this.route.queryParams.subscribe(params => {
      // refresh page number
      this.pageNum = 1;
      // ensure that current query parameter 'category' is not undefined
      if (typeof params.category === 'string') {
        this.category = params.category;
      } else {
        this.category = this.default;
      }
      console.log('Current category is ' + this.category);
      this.getNewsForCurrentPage();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prevPage() {
    this.pageNum = this.pageNum === 1 ? 1 : this.pageNum -= 1;
    this.getNewsForCurrentPage();
  }

  nextPage() {
    this.pageNum = this.pageNum === this.totalPage ? this.totalPage : this.pageNum += 1;
    this.getNewsForCurrentPage();
  }

  getNewsForCurrentPage() {
    // unsubscribe previous subscription if exists
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // clear previous news items
    this.newsItems = [];
    // load news items
    this.newsItems$ = this.api.getNewsForPage(this.category, this.pageNum, this.pageSize);
    this.subscription = this.newsItems$.subscribe(
      data => {
        console.log(data);
        this.totalPage = Math.ceil(this.api.dataSize / this.pageSize);
        this.newsItems.push(data);
      }, error => {
        console.log(error);
      });
  }
}
