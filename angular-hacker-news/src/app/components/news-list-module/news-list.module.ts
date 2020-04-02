import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsListRoutingModule } from '@hackerNews/components/news-list-module/news-list-routing.module';
import { NewsListComponent } from '@hackerNews/components/news-list-module/news-list.component';
import { NewsItemComponent } from '@hackerNews/components/news-list-module/news-item/news-item.component';

@NgModule({
    declarations: [NewsListComponent, NewsItemComponent],
    imports: [CommonModule, NewsListRoutingModule],
})
export class NewsListModule {}
