import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from '../../main/main.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-art',
  templateUrl: './create-art.component.html',
  styleUrls: ['./create-art.component.css']
})
export class CreateArtComponent implements OnInit {

  artInfo = {
    title : null,
    content : null,
    MarkdownContent : null,
    label : []
  }
  chips : Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _MainService : MainService
  ) { }

  ngOnInit() {
  }

  async createArticle(){
    try{
      await this._MainService.createArticle(this.artInfo)
      this.router.navigate(['/main']);
    }catch(e){
      return 
    }        
  }

  addLabel(event){
    this.artInfo.label = event.chips
  }
}
