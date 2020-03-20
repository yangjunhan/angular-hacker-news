import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { retry, map, tap, flatMap, timeout } from 'rxjs/operators';

const prefix = 'https://hacker-news.firebaseio.com/v0/';
const newsPrefix = prefix + '/item/';
const userPrefix = prefix + '/user/';
const suffix = '.json?print=pretty';

@Injectable({
  providedIn: 'root'
})
/**
 * This API uses HttpClient from angular's common/http library as well as RxJS
 * to handle Hacker News GET requests.
 * The static prefix and suffix of GET URL is provided from the HackerNews API documentation:
 * https://github.com/HackerNews/API
 */
export class HackerNewsApiService {

  constructor(private http: HttpClient) { }
  private totalPage: number;

  /**
   * convert from given Unix time input to a pretty string indicating the time.
   * e.g. 10 hours age, 3 days ago.
   */
  static formatTime(timespan: number): string {
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

  /**
   * Getter for total page
   */
  public getTotalPage(): number {
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
    console.log(reqUrl);
    return this.http.get(reqUrl)
      .pipe(
        // retry at most 3 times, timeout after 5 seconds
        retry(3),
        timeout(5000));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain data for news item with given news ID
   */
  public getNewsItemById(id: string): Observable<object> {
    const reqUrl = newsPrefix + id + suffix;
    const time = 'time';
    console.log(reqUrl);
    return this.http.get(reqUrl)
      .pipe(
        // retry at most 3 times, timeout after 5 seconds
        retry(3),
        timeout(5000),
        map(data => {
          // format the time string
          if (data) {
            data[time] = HackerNewsApiService.formatTime(data[time]);
          }
          return data;
        }
      ));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain a list data for news with given category.
   * The list of data is sliced according to page number and page size.
   */
  public getNewsForPage(category: string, pageNum: number, pageSize: number): Observable<object> {
    const length = 'length';
    return this.getNewsByCategory(category)
      .pipe(
        tap(data => {
          this.totalPage = Math.ceil(data[length] / pageSize);
        }),
        map(data => (data as Array<object>)
          .slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)),
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
    return this.http.get(reqUrl)
      .pipe(
        // retry at most 3 times, timeout after 5 seconds
        retry(3),
        timeout(5000),
        map(data => {
          // format the time string
          data[created] = HackerNewsApiService.formatTime(data[created]);
          return data;
        }
      ));
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain data for news comment with given comment ID.
   */
  public getCommentById(commentId: string): Observable<object> {
    const reqUrl = newsPrefix + commentId + suffix;
    const time = 'time';
    return this.http.get(reqUrl)
      .pipe(
        // retry at most 3 times, timeout after 5 seconds
        retry(3),
        timeout(5000),
        map(data => {
          // format the time string
          data[time] = HackerNewsApiService.formatTime(data[time]);
          return data;
        }
      ));
  }
}
