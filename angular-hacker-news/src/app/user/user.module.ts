import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from 'user/user-routing.module';
import { UserComponent } from 'user/user.component';

@NgModule({
    declarations: [UserComponent],
    imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
