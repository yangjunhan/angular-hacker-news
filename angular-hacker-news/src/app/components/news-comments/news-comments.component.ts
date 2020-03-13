import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.css']
})
export class NewsCommentsComponent implements OnInit {
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
      // obtain news item's id from params
      this.id = params.id;
      this.api.getNewsItemById(this.id).subscribe(data => {
        console.log(data);
        this.newsData = data;
        // all data has been stored, set loaded variable to be true
        this.loaded = true;
      }, error => console.log(error));
    });
  }

  /**
   * Function to be a click event which opens a new tab of given URL
   */
  public openLink(): void {
    window.open(this.newsData.url);
  }
}
