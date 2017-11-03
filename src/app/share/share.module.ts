import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material.module';
import { HttpModule } from '@angular/http';
@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    HttpModule,
    CommonModule,    
    FormsModule,ReactiveFormsModule ,
    CustomMaterialModule,
        
  ],
  providers:[],
  declarations: []
})
export class ShareModule { }
