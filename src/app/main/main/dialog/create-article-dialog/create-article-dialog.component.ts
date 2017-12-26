import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { artInfo } from '../../art-info.class';
import { MainService } from '../../main.service';


@Component({
  selector: 'app-create-article-dialog',
  templateUrl: './create-article-dialog.component.html',
  styleUrls: ['./create-article-dialog.component.css']
})
export class CreateArticleDialogComponent implements OnInit {
  artInfo = new artInfo();
  constructor(
    private _MainService : MainService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close(false)
  }

  async createArticle(){
    try{
      await this._MainService.createArticle(this.artInfo)
      this.dialogRef.close(true)
    }catch(e){
      return 
    }        
  }

  getImgUrl(event){    
    this.artInfo['content'] = (this.artInfo['content'] || '') + `![${event.imgKey}](${event.imgPath})`    
  }
}
