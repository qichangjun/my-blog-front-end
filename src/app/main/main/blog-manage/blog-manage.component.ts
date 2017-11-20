import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { AuthService } from '../../../core/service/auth.service';

import { DeleteArticleDialogComponent } from '../dialog/delete-article-dialog/delete-article-dialog.component';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-manage',
  templateUrl: './blog-manage.component.html',
  styleUrls: ['./blog-manage.component.css']
})
export class BlogManageComponent implements OnInit {

  parameter = {
    currentPage : 1,
    pageSize : 10,
    sortField : 'lastReplyTime',
    totalElement : 1,
    userName : null
  }
  rows : Array<any> = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _MainService : MainService,
    public _AuthService : AuthService,
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter,params)      
      this.parameter.currentPage = Number(this.parameter.currentPage)
      if (this._AuthService.getCurrentUserInfo().role == 'admin'){
        this.getArticleLists()
      }
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

  async deleteArticle(row,type){
    let config = new MatDialogConfig();
    config.data = {
      row : row
    }
    let dialogRef = this.dialog.open(DeleteArticleDialogComponent,config);
    dialogRef.afterClosed().subscribe(res =>{
      if (res){
        this.getArticleLists()
      }
    })
  }
}
