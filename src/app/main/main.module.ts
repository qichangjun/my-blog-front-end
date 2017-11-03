import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { ShareModule } from '../share/share.module'
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    MainRoutingModule,
    ShareModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
