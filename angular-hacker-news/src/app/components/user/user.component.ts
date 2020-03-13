import {Component, OnInit} from '@angular/core';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private subscription: Subscription;
  public loaded: boolean;
  public userData: any;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.route.params.subscribe(params => {
      this.subscription = this.api.getUserByName(params.username).subscribe(data => {
        console.log(data);
        this.userData = data;
        // all data has been stored, set loaded variable to be true
        this.loaded = true;
      }, error => console.log(error));
    });
  }

  /**
   * Function to be a click event in this component.
   * It takes a type input and redirect it to corresponding hacker news page for that type.
   */
  public openLink(type: string): void {
    window.open('https://news.ycombinator.com/' + type + '?id=' + this.userData.id);
  }
}
