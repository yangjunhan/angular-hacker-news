import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { retry, map, tap, flatMap, timeout } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';

const prefix = 'https://hacker-news.firebaseio.com/v0/';
const newsPrefix = prefix + '/item/';
const userPrefix = prefix + '/user/';
const suffix = '.json?print=pretty';

@Injectable({
    providedIn: 'root',
})
/**
 * This API uses HttpClient from angular's common/http library as well as RxJS
 * to handle Hacker News GET requests.
 * The static prefix and suffix of GET URL is provided from the HackerNews API documentation:
 * https://github.com/HackerNews/API
 */
export class HackerNewsApiService implements HttpInterceptor {
    constructor(private http: HttpClient) {}
    private totalPage: number;
    /**
     * Use formatDistanceToNow from date-fns to compute the time distance string
     * based on the Unix time input, indicating the time of creation of the given text.
     * e.g. about 10 hours age, 3 days ago.
     */
    static formatTime(timespan: number): string {
        const date = new Date(1000 * timespan);
        return formatDistanceToNow(date) + ' ago';
    }

    // tslint:disable-next-line:no-any
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // timeout after 3 seconds per request, retry at most 3 times
            timeout(3000),
            retry(3),
        );
    }

    /**
     * Getter for total page
     */
    public get _totalPage(): number {
        if (this.totalPage) {
            return this.totalPage;
        }
        return null;
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain whole list of data for news items with given category.
     */
    public getNewsByCategory(category: string): Observable<object> {
        const reqUrl = prefix + category + suffix;
        // console.log(reqUrl);
        return this.http.get(reqUrl);
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain data for news item with given news ID
     */
    public getNewsItemById(id: string): Observable<object> {
        const reqUrl = newsPrefix + id + suffix;
        const time = 'time';
        // console.log(reqUrl);
        return this.http.get(reqUrl).pipe(
            map(data => {
                // format the time string
                if (data) {
                    data[time] = HackerNewsApiService.formatTime(data[time]);
                }
                return data;
            }),
        );
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain a list data for news with given category.
     * The list of data is sliced according to page number and page size.
     */
    public getNewsForPage(category: string, pageNum: number, pageSize: number): Observable<object> {
        const length = 'length';
        return this.getNewsByCategory(category).pipe(
            tap(data => {
                this.totalPage = Math.ceil(data[length] / pageSize);
            }),
            map(data => (data as Array<object>).slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)),
            flatMap(data => from(data)),
            flatMap(data => this.getNewsItemById(String(data))),
        );
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain data for a user with given username.
     */
    public getUserByName(username: string): Observable<object> {
        const reqUrl = userPrefix + username + suffix;
        const created = 'created';
        return this.http.get(reqUrl).pipe(
            map(data => {
                // format the time string
                data[created] = HackerNewsApiService.formatTime(data[created]);
                return data;
            }),
        );
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain data for news comment with given comment ID.
     */
    public getCommentById(commentId: string): Observable<object> {
        const reqUrl = newsPrefix + commentId + suffix;
        const time = 'time';
        return this.http.get(reqUrl).pipe(
            map(data => {
                // format the time string
                data[time] = HackerNewsApiService.formatTime(data[time]);
                return data;
            }),
        );
    }
}
