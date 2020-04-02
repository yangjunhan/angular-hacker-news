import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'news/:category',
        loadChildren: () =>
            import('@hackerNews/components/news-list-module/news-list.module').then(
              m => m.NewsListModule
            ),
    },
    {
        path: '',
        redirectTo: 'news/topstories',
        pathMatch: 'full',
    },
    {
        path: 'user/:username',
        loadChildren: () => import('@hackerNews/components/user-module/user.module').then(
          m => m.UserModule
        ),
    },
    {
        path: 'comments/:id',
        loadChildren: () =>
            import('@hackerNews/components/news-comments-module/news-comments.module').then(
                m => m.NewsCommentsModule,
            ),
    },
    {
        path: 'errors',
        loadChildren: () =>
            import('@hackerNews/components/errors-module/errors.module').then(
              m => m.ErrorsModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
