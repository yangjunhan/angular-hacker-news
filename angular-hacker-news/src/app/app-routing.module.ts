import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { UserComponent } from './components/user/user.component';
import { NewsCommentsComponent } from './components/news-comments/news-comments.component';
import { ErrorsComponent } from './components/errors/errors.component';

const routes: Routes = [
    // store category info in route data, which can be retrieved in snapshot conveniently
    { path: 'news/:category', component: NewsListComponent },
    { path: '', redirectTo: 'news/topstories', pathMatch: 'full' },
    { path: 'user/:username', component: UserComponent },
    { path: 'comments/:id', component: NewsCommentsComponent },
    { path: 'errors', component: ErrorsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
