import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HackerNewsApiService } from 'Services/hacker-news-api.service';
import { NewsItem } from 'Interfaces/newsItem';

@Component({
    selector: 'app-news-comments',
    templateUrl: './news-comments.component.html',
    styleUrls: ['./news-comments.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCommentsComponent implements OnInit {
    private id: string;
    public newsData: NewsItem;
    public loading: boolean;

    constructor(
        private route: ActivatedRoute,
        private api: HackerNewsApiService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.route.params.subscribe(params => {
            // obtain news item's id from params
            this.id = params.id;
            this.api.getNewsItemById(this.id).subscribe(
                data => {
                    if (data) {
                        this.newsData = data as NewsItem;
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
        });
    }

    /**
     * Function to be a click event which opens a new tab of given URL
     */
    public openLink(): void {
        window.open(this.newsData.url);
    }
}
