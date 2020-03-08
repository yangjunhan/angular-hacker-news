import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { UserComponent } from './components/user/user.component';
import { NewsCommentsComponent } from './components/news-comments/news-comments.component';

const routes: Routes = [
  {path: '', component: NewsListComponent},
  {path: 'user/:username', component: UserComponent},
  {path: 'comments/:id', component: NewsCommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
