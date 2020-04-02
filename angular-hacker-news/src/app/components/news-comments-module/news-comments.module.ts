import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsCommentsRoutingModule } from '@hackerNews/components/news-comments-module/news-comments-routing.module';
import { NewsCommentsComponent } from '@hackerNews/components/news-comments-module/news-comments.component';
import { CommentTreeComponent } from '@hackerNews/components/news-comments-module/comment-tree/comment-tree.component';

@NgModule({
    declarations: [NewsCommentsComponent, CommentTreeComponent],
    imports: [CommonModule, NewsCommentsRoutingModule],
})
export class NewsCommentsModule {}
