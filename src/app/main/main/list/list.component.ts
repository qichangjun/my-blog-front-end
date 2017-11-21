import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';


import { MainService } from '../main.service';
import { AuthService } from '../../../core/service/auth.service';

import { CreateArticleDialogComponent } from '../dialog/create-article-dialog/create-article-dialog.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  rows : Array<any> = [];
  inputModel : boolean = false;
  parameter = {
    currentPage : 1,
    pageSize : 10,
    sortField : 'lastReplyTime',
    totalElement : 1,
    labels : []
  }
  labelLists : Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _AuthService : AuthService,
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog,
    private _MainService : MainService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter,params)
      
      this.parameter.currentPage = Number(this.parameter.currentPage)
      if (this.parameter.labels && typeof(this.parameter.labels) == 'string'){
        this.parameter.labels = [this.parameter.labels]
      }
      this.getArticleLists()
    })    
  }
  
  async getArticleLists(){
    let res = await this._MainService.getArticleLists(this.parameter)
    this.rows = res.data
    this.parameter['totalElement'] = res.totalElement
  }

  pageChanged(e){
    this.parameter.currentPage = e.page
    this.router.navigate([], { queryParams: this.parameter });
  }

  addLabel(e){
    this.parameter.labels = e.chips
    this.getArticleLists()
  }

  createArticle(){
    let config = new MatDialogConfig();
    config.height = 'auto';
    config.width = '800px';
    let dialogRef = this.dialog.open(CreateArticleDialogComponent,config);
    dialogRef.afterClosed().subscribe(res =>{
      if (res){
        this.getArticleLists()
      }
    })
  }
}
