import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsCommentsComponent } from '@hackerNews/components/news-comments-module/news-comments.component';

const routes: Routes = [{ path: '', component: NewsCommentsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsCommentsRoutingModule {}
