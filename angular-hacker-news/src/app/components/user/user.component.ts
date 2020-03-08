import {Component, OnDestroy, OnInit} from '@angular/core';
import {HackerNewsApiService} from '../../services/hacker-news-api.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
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
        this.loaded = true;
      }, error => console.log(error));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openLink(type) {
    window.open('https://news.ycombinator.com/' + type + '?id=' + this.userData.id);
  }
}
