import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from '@hackerNews/components/errors-module/errors-routing.module';
import { ErrorsComponent } from '@hackerNews/components/errors-module/errors.component';

@NgModule({
    declarations: [ErrorsComponent],
    imports: [CommonModule, ErrorsRoutingModule],
})
export class ErrorsModule {}
