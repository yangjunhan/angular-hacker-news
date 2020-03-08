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

  getNewsByCategory(category): Observable<any> {
    const reqUrl = prefix + category + suffix;
    console.log(reqUrl);
    return this.http.get(reqUrl)
      .pipe(retry(3))
      .pipe(tap(data => {
        this.dataSource = data;
        this.dataSize = data.length;
      }));
  }

  getNewsItemById(id) {
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

  getNewsForPage(category, pageNum, pageSize) {
    return this.getNewsByCategory(category)
      .pipe(map(data => data.slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)))
      .pipe(flatMap(data => from(data)))
      .pipe(flatMap(data => this.getNewsItemById(data)));
  }

  getUserByName(username) {
    const reqUrl = userPrefix + username + suffix;
    return this.http.get(reqUrl)
      .pipe(retry(3))
      .pipe(map(data => {
        // format the time string
        (data as any).created = this.formatTime((data as any).created);
        return data;
      }));
  }

  formatTime(timespan) {
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
