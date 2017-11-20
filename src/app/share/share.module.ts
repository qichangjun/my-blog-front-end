import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material.module';
import { HttpModule } from '@angular/http';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { UploadImgDialogComponent } from './upload-img-dialog/upload-img-dialog.component';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule    
  ],
  exports:[
    PaginationModule,
    HttpModule,
    CommonModule,    
    FormsModule,ReactiveFormsModule ,
    CustomMaterialModule,
    EditToolbarComponent,
    UploadImgDialogComponent
  ],
  providers:[PaginationConfig],
  declarations: [EditToolbarComponent, UploadImgDialogComponent],
  entryComponents:[UploadImgDialogComponent]
})
export class ShareModule { }
