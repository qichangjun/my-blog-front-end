import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from '../../main/main.service';

import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../topic/topic.service';

declare var marked:any;

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  artInfo = {
    title : null,
    content : null,
    markDownContent : null
  }
  parameter = {
    id : null
  }
  constructor(
    private _TopicService : TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private _MainService : MainService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      this.parameter.id = params.id
      this.getArtInfo()
    })
  }

  async getArtInfo(){
    this.artInfo = await this._TopicService.getArticleDetail(this.parameter)
    this.artInfo['markDownContent'] = marked(this.artInfo['content'])
  }

  async editArticle(){
    try{
      await this._MainService.editArticle(this.artInfo)
      this.router.navigate(['/main/topic',this.parameter.id]);
    }catch(e){
      return 
    }        
  }

  markDown(e){
    marked(e.target.value,(err,content)=>{      
      this.artInfo['markDownContent'] = content
    })
    
  }

  getImgUrl(event){    
    this.artInfo['content'] = (this.artInfo['content'] || '') + `![${event.imgKey}](${event.imgPath})`    
    marked(this.artInfo['content'],(err,content)=>{      
      this.artInfo['markDownContent'] = content
    })
  }

}
