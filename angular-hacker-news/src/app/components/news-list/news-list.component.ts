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
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
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
            this.totalPage = this.api.getTotalPage();
            this.newsItems.push(data);
          }
          this.loading = false;
        }, error => {
          console.log(error);
          return this.router.navigate(['/errors']);
        });
  }

  /**
   * Function to be a click event in Pagination.
   * decrement current page number by 1 (minimum 1)
   * and refresh the list component
   */
  public prevPage(): Promise<boolean> {
    this.pageNum = Math.max(1, this.pageNum - 1);
    return this.navigateTo(this.category, this.pageNum);
  }

  /**
   * Function to be a click event in Pagination.
   * increment current page number by 1 (maximum total page number)
   * and refresh the list component
   */
  public nextPage(): Promise<boolean> {
    this.pageNum = Math.min(this.totalPage, this.pageNum + 1);
    return this.navigateTo(this.category, this.pageNum);
  }

  /**
   * Navigate to page with new category and/or new page number
   */
  public navigateTo(newCategory: string, newPageNum: number): Promise<boolean> {
    return this.router.navigate(['/' + this.category], {
      queryParams: {page: newPageNum}
    });
  }
}
