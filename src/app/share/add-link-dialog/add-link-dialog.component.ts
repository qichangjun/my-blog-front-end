import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.css']
})
export class AddLinkDialogComponent implements OnInit {
    info = {
        title : null,
        link : 'http://'
    }
  constructor(
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  addLink(){
    this.dialogRef.close(this.info);
  }
  cancel(){
    this.dialogRef.close(false);
  }
}
