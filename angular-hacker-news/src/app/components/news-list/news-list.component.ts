import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  // set default news category as 'top'
  default = 'top';
  category: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // obtain current category for displaying
    this.route.queryParams.subscribe(params => {
      // ensure that current query parameter 'category' is not undefined
      if (typeof params.category === 'string') {
        this.category = params.category;
      } else {
        this.category = this.default;
      }
      console.log('Current category is ' + this.category);
    });
  }

}
