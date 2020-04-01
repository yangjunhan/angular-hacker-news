import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from 'errors/errors-routing.module';
import { ErrorsComponent } from 'errors/errors.component';

@NgModule({
    declarations: [ErrorsComponent],
    imports: [CommonModule, ErrorsRoutingModule],
})
export class ErrorsModule {}
