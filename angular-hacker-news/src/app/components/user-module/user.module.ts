import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '@hackerNews/components/user-module/user-routing.module';
import { UserComponent } from '@hackerNews/components/user-module/user.component';

@NgModule({
    declarations: [UserComponent],
    imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
