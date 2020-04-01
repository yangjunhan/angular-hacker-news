import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { HackerNewsApiService } from 'Services/hacker-news-api.service';
import { NewsItem } from 'Interfaces/newsItem';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent implements OnInit {
    // set default news category as 'topstories' and page max size as 20
    private default = 'topstories';
    public pageSize = 20;
    public category: string;
    public newsItems: Array<NewsItem>;
    public pageNum: number;
    public totalPage: number;
    public loading: boolean;

    constructor(
        private route: ActivatedRoute,
        private api: HackerNewsApiService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loading = true;
        // use combineLatest to bind both paramMap and queryParamMap
        combineLatest([this.route.paramMap, this.route.queryParamMap])
            // use switchMap to control the data stream received
            .pipe(
                switchMap(([paramMap, queryParamMap]) => {
                    // get current category and page number, and initialise data list
                    this.category = paramMap.get('category') || this.default;
                    this.pageNum = +queryParamMap.get('page') || 1;
                    this.newsItems = [];
                    console.log('Current page number is ' + this.pageNum);
                    console.log('Current category is ' + this.category);
                    return this.api.getNewsForPage(this.category, this.pageNum, this.pageSize);
                }),
            )
            .subscribe(
                data => {
                    if (data) {
                        this.totalPage = this.api._totalPage;
                        this.newsItems.push(data as NewsItem);
                        // call markForCheck() to update the view
                        this.cdr.markForCheck();
                    }
                    // all data has been stored, set loading variable to be false
                    this.loading = false;
                },
                error => {
                    console.log(error);
                    return this.router.navigate(['/errors']);
                },
            );
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
        return this.router.navigate(['/news', newCategory], {
            queryParams: { page: newPageNum },
        });
    }
}
