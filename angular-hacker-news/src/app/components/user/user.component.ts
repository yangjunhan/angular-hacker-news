import {Component, OnInit} from '@angular/core';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public loading: boolean;
  public userData: any;

  constructor(
    private route: ActivatedRoute,
    private api: HackerNewsApiService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.api.getUserByName(params.username).subscribe(data => {
        console.log(data);
        this.userData = data;
        // all data has been stored, set loaded variable to be true
        this.loading = false;
      }, error => {
        console.log(error);
        return this.router.navigate(['/errors']);
      });
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
