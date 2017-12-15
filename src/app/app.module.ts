import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AppRouteModule } from './app-route.module';
import { BaseRequestOptions,Headers } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
declare var marked:any;
declare var hljs:any;
export class CustomRequestOptions extends BaseRequestOptions {
  headers = new Headers({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
  });
}

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserAnimationsModule,
    CoreModule.forRoot(CustomRequestOptions),
    AppRouteModule
    
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
