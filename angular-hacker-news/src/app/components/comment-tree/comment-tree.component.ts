import { Component, Input, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../../services/hacker-news-api.service';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnInit {
  @Input() rootId: string;
  public rootComment: any;
  public loaded: boolean;
  public hide: boolean;
  constructor(
    private api: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.hide = true;
    this.api.getCommentById(this.rootId).subscribe(data => {
      console.log(data);
      this.rootComment = data;
      this.loaded = true;
    }, error => console.log(error));
  }

  public toggleHide(): void {
    this.hide = !this.hide;
  }
}
