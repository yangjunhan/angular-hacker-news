import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsListRoutingModule } from 'news-list/news-list-routing.module';
import { NewsListComponent } from 'news-list/news-list.component';
import { NewsItemComponent } from 'news-item/news-item.component';

@NgModule({
    declarations: [NewsListComponent, NewsItemComponent],
    imports: [CommonModule, NewsListRoutingModule],
})
export class NewsListModule {}
