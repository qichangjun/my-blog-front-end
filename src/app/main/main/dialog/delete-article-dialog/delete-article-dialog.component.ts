import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { artInfo } from '../../art-info.class';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-delete-article-dialog',
  templateUrl: './delete-article-dialog.component.html',
  styleUrls: ['./delete-article-dialog.component.css']
})
export class DeleteArticleDialogComponent implements OnInit {

  constructor(
    private _MainService : MainService,
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close(false)
  }
  
  async deleteArticle(){
    await this._MainService.deleteArticle(this.data.row._id)
    this.dialogRef.close(true)
  }
}
