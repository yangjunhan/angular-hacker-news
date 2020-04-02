import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListComponent } from '@hackerNews/components/news-list-module/news-list.component';

const routes: Routes = [{ path: '', component: NewsListComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsListRoutingModule {}
