import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsCommentsComponent } from 'news-comments/news-comments.component';

const routes: Routes = [{ path: '', component: NewsCommentsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsCommentsRoutingModule {}
