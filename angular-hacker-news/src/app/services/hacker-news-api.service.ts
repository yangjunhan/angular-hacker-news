import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';
import { User } from '../interfaces/user';
import { NewsItem } from '../interfaces/newsItem';
import { Comment } from '../interfaces/comment';

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
export class HackerNewsApiService {
    constructor(private http: HttpClient) {}

    /**
     * Getter for total page
     */
    public get _totalPage(): number {
        if (this.totalPage) {
            return this.totalPage;
        }
        return null;
    }
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

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain whole list of data for news items with given category.
     */
    public getNewsByCategory(category: string): Observable<object> {
        const reqUrl = prefix + category + suffix;
        return this.http.get(reqUrl);
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain data for news item with given news ID
     */
    public getNewsItemById(id: string): Observable<object> {
        const reqUrl = newsPrefix + id + suffix;
        return this.http.get(reqUrl).pipe(
            map(data => {
                const newsItem = data as NewsItem;
                // format the time string
                if (data) {
                    newsItem.time = HackerNewsApiService.formatTime(Number(newsItem.time));
                }
                return newsItem;
            }),
        );
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain a list data for news with given category.
     * The list of data is sliced according to page number and page size.
     */
    public getNewsForPage(category: string, pageNum: number, pageSize: number): Observable<object> {
        return this.getNewsByCategory(category).pipe(
            tap(ids => {
                this.totalPage = Math.ceil((ids as Array<string>).length / pageSize);
            }),
            map(ids => (ids as Array<object>).slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)),
            flatMap(ids => from(ids)),
            flatMap(id => this.getNewsItemById(String(id))),
        );
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain data for a user with given username.
     */
    public getUserByName(username: string): Observable<object> {
        const reqUrl = userPrefix + username + suffix;
        return this.http.get(reqUrl).pipe(
            map(data => {
                const user = data as User;
                // format the time string
                user.created = HackerNewsApiService.formatTime(Number(user.created));
                return user;
            }),
        );
    }

    /**
     * Return an observable object that sends a HTTP GET request to HackerNews API
     * to obtain data for news comment with given comment ID.
     */
    public getCommentById(commentId: string): Observable<object> {
        const reqUrl = newsPrefix + commentId + suffix;
        return this.http.get(reqUrl).pipe(
            map(data => {
                const comment = data as Comment;
                // format the time string
                comment.time = HackerNewsApiService.formatTime(Number(comment.time));
                return comment;
            }),
        );
    }
}
