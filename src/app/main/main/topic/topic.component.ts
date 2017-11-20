import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { TopicService } from './topic.service';
import { AuthService } from '../../../core/service/auth.service';

import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DeleteReplyDialogComponent } from '../dialog/delete-reply-dialog/delete-reply-dialog.component';

declare var marked:any;
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
  
})
export class TopicComponent implements OnInit {
  replyInfo = {
    content : null,
    MarkdownContent : null
  }
  replyChildInfo = {}
  artInfo = {
    title : null,
    markDownContent : null,
    replyList : [],
    content : null,
    author : null
  }
  parameters : Params = {
    id : null
  }
  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    public _AuthService : AuthService,
    private route: ActivatedRoute,
    private _TopicService : TopicService
  ){}

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.parameters = Object.assign(this.parameters,params)
      this._TopicService.updateCheckTimes(params)
      this.getArtInfo()
    })
  }

  markDown(e){
    marked(e.target.value,(err,content)=>{      
      this.replyInfo['MarkdownContent'] = content
    })
    
  }

  async getArtInfo(){
    this.artInfo = await this._TopicService.getArticleDetail(this.parameters)
    this.artInfo['markDownContent'] = marked(this.artInfo['content'])
    this.artInfo['replyList'].forEach(c => {
      marked(c.content,(err,content)=>{
        c['markdownContent'] = content
      })
    });
  }

  async addReply(){
    await this._TopicService.addReply(this.parameters.id,this.replyInfo)
    this.getArtInfo()
  }

  async addChildReply(id){
    await this._TopicService.addChildReply(this.parameters.id,id,this.replyChildInfo)
    this.replyChildInfo = {}
    this.getArtInfo()
  }

  deleteReply(i,reply){
    let config = new MatDialogConfig();
    config.data = {
      reply : reply,
      artId : this.parameters.id
    }
    let dialogRef = this.dialog.open(DeleteReplyDialogComponent,config);
    dialogRef.afterClosed().subscribe((res) =>{
      if (res){
        this.artInfo['replyList'].splice(i,1)
      }
    })
  }

  getImgUrl(event){    
    this.replyInfo['content'] = (this.replyInfo['content'] || '') + `![${event.imgKey}](${event.imgPath})`
    marked(this.replyInfo['content'],(err,content)=>{      
      this.replyInfo['MarkdownContent'] = content
    })
  }

}


export class Params {
  id : string;
}