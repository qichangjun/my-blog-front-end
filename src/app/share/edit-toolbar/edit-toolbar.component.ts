import { Component, OnInit ,EventEmitter,Output,Input,ViewChild} from '@angular/core';

import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UploadImgDialogComponent } from '../upload-img-dialog/upload-img-dialog.component';
import { AddLinkDialogComponent } from '../add-link-dialog/add-link-dialog.component';
import { AuthService } from '../../core/service/auth.service';
import { ConstantService } from '../../core/service/constant.service';
import { ApiUrlService } from '../../core/service/api.service';
declare var marked:any;
declare var Dropzone:any;
declare var toastr:any;
@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrls: ['./edit-toolbar.component.css']
})
export class EditToolbarComponent implements OnInit {
  @Input() artInfo;
  @ViewChild('uploadMd') uploadMd:any;
  isUploading : boolean = false;
  currentTab : number = 0;
  dropZone : any;
  uploadingMdFile : any;
  constructor(
    private _AuthService : AuthService,
    private _constantService : ConstantService,
    private _apiUrlService : ApiUrlService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    let option = {
      parallelUploads : 1,
      maxFiles : 1,   
      acceptedFiles : '.md',   
      params : {
        token : this._AuthService.getCurrentUser().accessToken
      },
      previewsContainer : false,
      url : this._constantService.baseUrl() + this._apiUrlService['uploadMdFile']
    }
    this.dropZone = new Dropzone(this.uploadMd.nativeElement,option)

    this.dropZone.on('uploadprogress',(file,progress)=>{
      file.upload.progress = parseInt(file.upload.progress)      
    })

    this.dropZone.on('sending',(file,xhr,formData)=>{
      this.uploadingMdFile = file   
      this.isUploading = true   
    })
    
    this.dropZone.on('success',(file,res)=>{
      file.status = res.code == 1 ? 'success'  : 'error';
      this.isUploading = false
      if (res.code == 1){
        this.artInfo['content'] = res.data
        marked(this.artInfo['content'],(err,content)=>{      
          this.artInfo['MarkdownContent'] = content
        })
      }else{        
        toastr.error('上传出错',res.data);
      }
      this.dropZone.removeFile(file);
    })
  }

  uploadImg(){
    let config = new MatDialogConfig();    
    config.height = 'auto';
    config.width = '600px';
    let dialogRef = this.dialog.open(UploadImgDialogComponent,config);
    dialogRef.afterClosed().subscribe((res) =>{
      if (res){
        this.artInfo['content'] = (this.artInfo['content'] || '') + `![${res.imgKey}](${res.imgPath})`    
        marked(this.artInfo['content'],(err,content)=>{      
          this.artInfo['MarkdownContent'] = content
        })
      }
    })
  }

  addLink(){
    let config = new MatDialogConfig();    
    config.height = 'auto';
    config.width = '600px';
    let dialogRef = this.dialog.open(AddLinkDialogComponent,config);
    dialogRef.afterClosed().subscribe((res) =>{
      if (res){
        this.artInfo['content'] = (this.artInfo['content'] || '') + `[${res.title}](${res.link})`    
        marked(this.artInfo['content'],(err,content)=>{      
          this.artInfo['MarkdownContent'] = content
        })
      }
    })
  }

  markDown(e){
    marked(e.target.value,(err,content)=>{      
      this.artInfo['MarkdownContent'] = content
    })    
  }

  switchMode(){
    if (this.currentTab == 1){
      this.currentTab = 0
      return
    }
    this.currentTab = 1
  }
}
