import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {retry, map, tap, flatMap} from 'rxjs/operators';

const prefix = 'https://hacker-news.firebaseio.com/v0/';
const newsPrefix = prefix + '/item/';
const userPrefix = prefix + '/user/';
const suffix = '.json?print=pretty';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  private dataSource: Observable<object>;
  public dataSize: number;

  constructor(private http: HttpClient) { }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain whole list of data for news items with given category.
   */
  getNewsByCategory(category: string): Observable<any> {
    const reqUrl = prefix + category + suffix;
    console.log(reqUrl);
    return this.http.get(reqUrl)
      .pipe(retry(3))
      .pipe(tap(data => {
        this.dataSource = data;
        this.dataSize = data.length;
      }));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain data for news item with given news ID
   */
  getNewsItemById(id: string): Observable<any> {
    const reqUrl = newsPrefix + id + suffix;
    console.log(reqUrl);
    return this.http.get(reqUrl)
      .pipe(retry(3))
      .pipe(map(data => {
        // format the time string
        if (data) {
          (data as any).time = this.formatTime((data as any).time);
        }
        return data;
      }));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain a list data for news with given category.
   * The list of data is sliced according to page number and page size.
   */
  getNewsForPage(category: string, pageNum: number, pageSize: number): Observable<any> {
    return this.getNewsByCategory(category)
      .pipe(map(data => data.slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)))
      .pipe(flatMap(data => from(data)))
      .pipe(flatMap(data => this.getNewsItemById(String(data))));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain data for a user with given username.
   */
  getUserByName(username: string): Observable<any> {
    const reqUrl = userPrefix + username + suffix;
    return this.http.get(reqUrl)
      .pipe(retry(3))
      .pipe(map(data => {
        // format the time string
        (data as any).created = this.formatTime((data as any).created);
        return data;
      }));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain data for news comment with given comment ID.
   */
  getCommentById(id: string): Observable<any> {
    const reqUrl = newsPrefix + id + suffix;
    return this.http.get(reqUrl)
      .pipe(retry(3))
      .pipe(map(data => {
        // format the time string
        (data as any).time = this.formatTime((data as any).time);
        return data;
      }));
  }

  /**
   * convert from given Unix time input to a pretty string indicating the time.
   * e.g. 10 hours age, 3 days ago.
   */
  formatTime(timespan: number): string {
    let timeStr;
    const dateTime = new Date(1000 * timespan);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth();
    const day = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const now = new Date();
    const secondsDiff = now.valueOf() / 1000 - timespan;

    if (secondsDiff <= 60) {
      timeStr = 'Just now';
    }  else if (60 < secondsDiff && secondsDiff <= 60 * 60) {
      timeStr = Math.round((secondsDiff / (60))) + ' minutes ago';
    }  else if (60 * 60 < secondsDiff && secondsDiff <= 60 * 60 * 24) {
      timeStr = Math.round(secondsDiff / (60 * 60)) + ' hours ago';
    }  else if (60 * 60 * 24 < secondsDiff && secondsDiff <= 60 * 60 * 24 * 15) {
      timeStr = Math.round(secondsDiff / (60 * 60 * 24)) + ' days ago';
    }  else if (secondsDiff > 60 * 60 * 24 * 15 && year === now.getFullYear()) {
      timeStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
      timeStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeStr;
  }
}
