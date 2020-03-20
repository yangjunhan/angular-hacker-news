import { Component, Input, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnInit {
  @Input() rootId: string;
  public rootComment: object;
  public loaded: boolean;
  public hide: boolean;
  constructor(
    private api: HackerNewsApiService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.hide = true;
    this.api.getCommentById(this.rootId).subscribe(data => {
      console.log(data);
      this.rootComment = data;
      this.loaded = true;
    }, error => {
      console.log(error);
      return this.router.navigate(['/errors']);
    });
  }

  public toggleHide(): void {
    this.hide = !this.hide;
  }
}
