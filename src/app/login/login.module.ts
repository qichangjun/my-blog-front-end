import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module'
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterDialogComponent } from './login/dialog/register-dialog/register-dialog.component';
@NgModule({
  imports: [
    ShareModule,LoginRoutingModule
  ],
  providers:[],
  declarations: [LoginComponent, RegisterDialogComponent],
  entryComponents:[RegisterDialogComponent]
})
export class LoginModule { }
