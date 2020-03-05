import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {retry, map, tap, catchError, flatMap} from 'rxjs/operators';

const prefix = 'https://hacker-news.firebaseio.com/v0/';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  private reqUrl: string;
  private dataSource: Observable<object>;
  public dataSize: number;

  constructor(private http: HttpClient) { }

  getNewsByCategory(category): Observable<any> {
    this.reqUrl = prefix + category + '.json?print=pretty';
    console.log(this.reqUrl);
    return this.http.get(this.reqUrl)
      .pipe(retry(3))
      .pipe(tap(data => {
        this.dataSource = data;
        this.dataSize = data.length;
      }));
  }

  getNewsItemById(id) {
    this.reqUrl = prefix + '/item/' + id + '.json?print=pretty';
    console.log(this.reqUrl);
    return this.http.get(this.reqUrl)
      .pipe(retry(3))
      .pipe(map(data => {
        // format the time string
        (data as any).time = this.formatTime((data as any).time);
        return data;
      }));
  }

  getNewsForPage(category, pageNum, pageSize) {
    return this.getNewsByCategory(category)
      .pipe(map(data => data.slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)))
      .pipe(flatMap(data => from(data)))
      .pipe(flatMap(data => this.getNewsItemById(data)));
  }

  formatTime(t) {
    let d = new Date().valueOf(); // get current time in seconds
    d -= t; // reduce current time by t
    return new Date(d).toLocaleDateString();
  }
}
