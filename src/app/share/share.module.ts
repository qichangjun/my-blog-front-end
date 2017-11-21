import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material.module';
import { HttpModule } from '@angular/http';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { UploadImgDialogComponent } from './upload-img-dialog/upload-img-dialog.component';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { LabelInputComponent } from './label-input/label-input.component';


import {SelectModule} from 'ng2-select';
import { MainService } from '../main/main/main.service';
@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ],
  exports:[
    SelectModule,
    PaginationModule,
    HttpModule,
    CommonModule,    
    FormsModule,ReactiveFormsModule ,
    CustomMaterialModule,
    EditToolbarComponent,
    UploadImgDialogComponent,
    LabelInputComponent
  ],
  providers:[PaginationConfig,MainService],
  declarations: [EditToolbarComponent, UploadImgDialogComponent, LabelInputComponent],
  entryComponents:[UploadImgDialogComponent]
})
export class ShareModule { }
