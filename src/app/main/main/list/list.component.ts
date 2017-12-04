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
  hotLabels : Array<any> = [];
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
    var filterLabels = ()=>{
      this.hotLabels.forEach((c)=>{        
        if (this.parameter.labels.indexOf(c.name) >= 0){
          c.isSelected = true          
        }
      }) 
    }    
    this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter,params)      
      this.parameter.currentPage = Number(this.parameter.currentPage)
      this.parameter.labels = Array.isArray(this.parameter.labels) ? this.parameter.labels : [this.parameter.labels]     
      this.getArticleLists()
      filterLabels()
    });  
    (async ()=>{
      this.hotLabels = await this._MainService.getLabelLists('')  
      filterLabels()
    })()      
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


  toggleLabel(label){
    label.isSelected = !label.isSelected
    let arr = Object.assign([],this.parameter.labels)
    if (label.isSelected){
      arr.push(label.name)      
    }else{
      arr.splice(this.parameter.labels.findIndex((c)=>{
        return c == label.name
      }),1)      
    }
    this.parameter.labels = arr
    this.router.navigate([], { queryParams: this.parameter });
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
