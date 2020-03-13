import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { UserComponent } from './components/user/user.component';
import { NewsCommentsComponent } from './components/news-comments/news-comments.component';
import { CommentTreeComponent } from './components/comment-tree/comment-tree.component';
import { ErrorsComponent } from './components/errors/errors.component';

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
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
