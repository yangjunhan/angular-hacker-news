import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'news/:category',
        loadChildren: () => import('news-list/news-list.module').then(m => m.NewsListModule),
    },
    {
        path: '',
        redirectTo: 'news/topstories',
        pathMatch: 'full',
    },
    {
        path: 'user/:username',
        loadChildren: () => import('user/user.module').then(m => m.UserModule),
    },
    {
        path: 'comments/:id',
        loadChildren: () => import('news-comments/news-comments.module').then(m => m.NewsCommentsModule),
    },
    {
        path: 'errors',
        loadChildren: () => import('errors/errors.module').then(m => m.ErrorsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
