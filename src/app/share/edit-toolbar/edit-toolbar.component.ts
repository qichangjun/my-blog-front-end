import { Component, OnInit ,EventEmitter,Output} from '@angular/core';

import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UploadImgDialogComponent } from '../upload-img-dialog/upload-img-dialog.component';


@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrls: ['./edit-toolbar.component.css']
})
export class EditToolbarComponent implements OnInit {
  @Output() getImgUrl : EventEmitter<any> = new EventEmitter();
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
        this.getImgUrl.emit(res);
      }
    })
  }
}
