import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guards';
const routes:Routes = [
  { path:'',redirectTo:'main/list',pathMatch:'full'},
  { path:'login',loadChildren:'app/login/login.module#LoginModule'},
  { path:'main',loadChildren:'app/main/main.module#MainModule',canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRouteModule {}
