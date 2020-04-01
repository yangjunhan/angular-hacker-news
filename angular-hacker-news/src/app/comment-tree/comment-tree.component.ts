import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HackerNewsApiService } from 'Services/hacker-news-api.service';
import { Comment } from 'Interfaces/comment';

@Component({
    selector: 'app-comment-tree',
    templateUrl: './comment-tree.component.html',
    styleUrls: ['./comment-tree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTreeComponent implements OnInit {
    @Input() rootId: string;
    public rootComment: Comment;
    public loaded: boolean;
    public hide: boolean;
    constructor(private api: HackerNewsApiService, private router: Router, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.loaded = false;
        this.hide = true;
        this.api.getCommentById(this.rootId).subscribe(
            data => {
                if (data) {
                    this.rootComment = data as Comment;
                    // call markForCheck() to update the view
                    this.cdr.markForCheck();
                }
                // all data has been stored, set loaded variable to be true
                this.loaded = true;
            },
            error => {
                console.log(error);
                return this.router.navigate(['/errors']);
            },
        );
    }

    public toggleHide(): void {
        this.hide = !this.hide;
    }
}
