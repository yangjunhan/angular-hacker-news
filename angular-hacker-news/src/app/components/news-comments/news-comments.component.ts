import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.css']
})
export class NewsCommentsComponent implements OnInit {
  private id: string;
  public newsData: any;
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      // obtain news item's id from params
      this.id = params.id;
      this.api.getNewsItemById(this.id).subscribe(data => {
        console.log(data);
        this.newsData = data;
        // all data has been stored, set loaded variable to be true
        this.loading = false;
      }, error => {
        console.log(error);
        return this.router.navigate(['/errors']);
      });
    });
  }

  /**
   * Function to be a click event which opens a new tab of given URL
   */
  public openLink(): void {
    window.open(this.newsData.url);
  }
}
