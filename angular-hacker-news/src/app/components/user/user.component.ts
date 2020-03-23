import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
    public loading: boolean;
    public userData: object;

    constructor(
        private route: ActivatedRoute,
        private api: HackerNewsApiService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.route.params.subscribe(params => {
            this.api.getUserByName(params.username).subscribe(
                data => {
                    if (data) {
                        this.userData = data;
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
     * Function to be a click event in this component.
     * It takes a type input and redirect it to corresponding hacker news page for that type.
     */
    public openLink(type: string): void {
        const id = 'id';
        window.open('https://news.ycombinator.com/' + type + '?id=' + this.userData[id]);
    }
}
