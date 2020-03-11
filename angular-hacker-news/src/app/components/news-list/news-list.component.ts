import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  // set default news category as 'topstories' and page max size as 20
  private default = 'topstories';
  public pageSize = 20;
  public category: string;
  public newsItems: Array<object>;
  public pageNum: number;
  public totalPage: number;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    // use snapshot to get the static data of category
    this.category = this.route.snapshot.data.category || this.default;
    this.route.queryParams
      // use switchMap to control the data stream received
      .pipe(switchMap(params => {
        // get current page number and initialise data list
        this.pageNum = +params.page || 1;
        this.newsItems = [];
        console.log('Current category is ' + this.category);
        return this.api.getNewsForPage(this.category, this.pageNum, this.pageSize);
      }))
      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.totalPage = Math.ceil(this.api.dataSize / this.pageSize);
            this.newsItems.push(data);
          }
        }, error => console.log(error));
  }

  prevPage() {
    this.pageNum = Math.max(1, this.pageNum - 1);
    return this.navigateTo(this.category, this.pageNum);
  }

  nextPage() {
    this.pageNum = Math.min(this.totalPage, this.pageNum + 1);
    return this.navigateTo(this.category, this.pageNum);
  }

  navigateTo(newCategory: string, newPageNum: number) {
    return this.router.navigate(['/' + this.category], {
      queryParams: {page: newPageNum}
    });
  }
}
