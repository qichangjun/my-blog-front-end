import { Component, OnInit ,EventEmitter,Output,Input} from '@angular/core';

import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UploadImgDialogComponent } from '../upload-img-dialog/upload-img-dialog.component';

declare var marked:any;
@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrls: ['./edit-toolbar.component.css']
})
export class EditToolbarComponent implements OnInit {
  @Input() artInfo;
  currentTab : number = 0;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
