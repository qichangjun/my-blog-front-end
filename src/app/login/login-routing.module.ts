import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service'
const routes:Routes = [
  { path:'',component:LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[LoginService],
  declarations: []
})
export class LoginRoutingModule { }
