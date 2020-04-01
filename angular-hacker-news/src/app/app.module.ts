import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'app-routing.module';
import { AppComponent } from 'app.component';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { NewsListComponent } from '@components/news-list/news-list.component';
import { NewsItemComponent } from '@components/news-item/news-item.component';
import { UserComponent } from '@components/user/user.component';
import { NewsCommentsComponent } from '@components/news-comments/news-comments.component';
import { CommentTreeComponent } from '@components/comment-tree/comment-tree.component';
import { ErrorsComponent } from '@components/errors/errors.component';
import { HttpRetryInterceptor } from '@interceptor/http-retry.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NewsListComponent,
        NewsItemComponent,
        UserComponent,
        NewsCommentsComponent,
        CommentTreeComponent,
        ErrorsComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
