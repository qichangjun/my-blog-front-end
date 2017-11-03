import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guards';
const routes:Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  { path:'main',loadChildren:'app/main/main.module#MainModule',canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRouteModule { }
