import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsCommentsRoutingModule } from 'news-comments/news-comments-routing.module';
import { NewsCommentsComponent } from 'news-comments/news-comments.component';
import { CommentTreeComponent } from 'comment-tree/comment-tree.component';

@NgModule({
    declarations: [NewsCommentsComponent, CommentTreeComponent],
    imports: [CommonModule, NewsCommentsRoutingModule],
})
export class NewsCommentsModule {}
