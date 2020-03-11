import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.css']
})
export class NewsCommentsComponent implements OnInit {
  private subscription: Subscription;
  private id: string;
  public newsData: any;
  public loaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.subscription = this.api.getNewsItemById(this.id).subscribe(data => {
        console.log(data);
        this.newsData = data;
        this.loaded = true;
      }, error => console.log(error));
    });
  }

  openLink(): void {
    window.open(this.newsData.url);
  }
}
