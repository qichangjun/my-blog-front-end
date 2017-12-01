import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../core/service/auth.service';
import { ConstantService } from '../../core/service/constant.service';
import { ApiUrlService } from '../../core/service/api.service';
declare var Dropzone:any;
declare var toastr:any;
@Component({
  selector: 'app-upload-img-dialog',
  templateUrl: './upload-img-dialog.component.html',
  styleUrls: ['./upload-img-dialog.component.css']
})
export class UploadImgDialogComponent implements OnInit {
  dropZone : any;
  uploadingImg : any;
  isUploading : boolean;
  @ViewChild('uploadContainer') uploadContainer:any;
  constructor(
    private _AuthService : AuthService,
    private _constantService : ConstantService,
    private _apiUrlService : ApiUrlService,
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    let option = {
      parallelUploads : 1,
      maxFiles : 1,
      acceptedFiles : 'image/*',
      params : {
        token : this._AuthService.getCurrentUser().accessToken
      },
      previewsContainer : false,
      url : this._constantService.baseUrl() + this._apiUrlService['uploadImg']
      // url : this._constantService.baseUrl() + this._apiUrlService['uploadM']
    }
    this.dropZone = new Dropzone(this.uploadContainer.nativeElement,option)

    this.dropZone.on('uploadprogress',(file,progress)=>{
      file.upload.progress = parseInt(file.upload.progress)      
    })

    this.dropZone.on('sending',(file,xhr,formData)=>{
      this.uploadingImg = file   
      this.isUploading = true   
    })

    this.dropZone.on('success',(file,res)=>{
      file.status = res.code == 1 ? 'success'  : 'error';
      this.isUploading = false;
      if (res.code == 1){
        this.dialogRef.close(res.data);
      }else{
        this.dropZone.removeFile(file);
        toastr.error('上传出错',res.data);
      }
    })
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
