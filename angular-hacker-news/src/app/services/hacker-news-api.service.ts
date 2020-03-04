import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {retry, map, catchError, flatMap} from 'rxjs/operators';

const prefix = 'https://hacker-news.firebaseio.com/v0/';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  private reqUrl: string;
  constructor(private http: HttpClient) { }

  getNewsByCategory(category): Observable<any> {
    this.reqUrl = prefix + category + '.json?print=pretty';
    console.log(this.reqUrl);
    return this.http.get(this.reqUrl)
      .pipe(retry(3));
  }

  getNewsItemById(id) {
    this.reqUrl = prefix + '/item/' + id + '.json?print=pretty';
    console.log(this.reqUrl);
    return this.http.get(this.reqUrl)
      .pipe(retry(3));
  }

  getNewsForPage(category, pageNum, pageSize) {
    return this.getNewsByCategory(category)
      .pipe(map(data => data.slice((pageNum - 1) * pageSize + 1, pageNum * pageSize + 1)))
      .pipe(flatMap(data => from(data)))
      .pipe(flatMap(data => this.getNewsItemById(data)));
  }
}