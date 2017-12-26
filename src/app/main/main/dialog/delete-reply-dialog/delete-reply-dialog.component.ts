import { Component, OnInit,Inject } from '@angular/core';

import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TopicService } from '../../topic/topic.service';

@Component({
  selector: 'app-delete-reply-dialog',
  templateUrl: './delete-reply-dialog.component.html',
  styleUrls: ['./delete-reply-dialog.component.css']
})
export class DeleteReplyDialogComponent implements OnInit {
  constructor(
    private _TopicService : TopicService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close(false);
  }

  async deleteReply(){
    await this._TopicService.deleteReply(this.data.reply._id,this.data.artId)
    this.dialogRef.close(true);
  }
}
