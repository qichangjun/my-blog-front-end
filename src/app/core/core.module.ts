import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ApiUrlService,AuthService,ConstantService,ServiceHandleService } from './service';

import { RequestOptions } from '@angular/http';
import { AuthGuard } from './guards/auth.guards';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[ApiUrlService,AuthService,ConstantService,ServiceHandleService]
})
export class CoreModule { 
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: RequestOptions, useClass: config },
        AuthGuard
      ]
    };
  }


}
