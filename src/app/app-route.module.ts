import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guards';
const routes:Routes = [
  { path:'',redirectTo:'login',pathMatch:'prefix'},  
  { path:'login',loadChildren:'./login/login.module#LoginModule'},
  { path:'main',loadChildren:'./main/main.module#MainModule',canActivate:[AuthGuard]},
  { path:'**',redirectTo:'main'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRouteModule {}
