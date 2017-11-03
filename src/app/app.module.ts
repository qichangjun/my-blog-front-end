import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AppRouteModule } from './app-route.module';
import { LoginModule } from './login/login.module';
import { BaseRequestOptions,Headers } from '@angular/http';

export class CustomRequestOptions extends BaseRequestOptions {
  headers = new Headers({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
  });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserAnimationsModule,
    CoreModule.forRoot(CustomRequestOptions),
    AppRouteModule,
    LoginModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
