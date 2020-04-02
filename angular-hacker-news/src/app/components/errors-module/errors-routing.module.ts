import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorsComponent } from '@hackerNews/components/errors-module/errors.component';

const routes: Routes = [{ path: '', component: ErrorsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingModule {}
