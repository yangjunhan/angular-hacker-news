import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItemComponent implements OnInit {
    @Input() index: number;
    @Input() id: string;
    @Input() title: string;
    @Input() by: string;
    @Input() url: string;
    @Input() time: string;
    @Input() score: number;
    @Input() comments: number;
    public domain: string;

    constructor() {}

    ngOnInit(): void {
        this.domain = this.getDomain(this.url);
    }

    /**
     * Extract domain from a given URL.
     */
    public getDomain(url: string): string {
        let hostname;
        if (url) {
            if (url.indexOf('://') > -1) {
                hostname = url.split('/')[2];
            } else {
                hostname = url.split('/')[0];
            }
            return hostname.split(':')[0].split('?')[0];
        }
        return null;
    }

    /**
     * Function to be a click event which opens a new tab of given URL
     */
    public openLink(): void {
        if (this.url) {
            window.open(this.url);
        }
    }
}
