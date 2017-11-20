import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MainService } from '../main.service';
import { AuthService } from '../../../core/service/auth.service';

import { DeleteArticleDialogComponent } from '../dialog/delete-article-dialog/delete-article-dialog.component';
import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {
  userInfo = {
    userName : null,
    email : null,
    registerTime : null,
    role : null
  }
  parameter = {
    userName : null
  }
  rows : Array<any> = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _UserService : UserService,
    private _MainService : MainService,
    private _AuthService : AuthService,
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      this.parameter.userName = params.userName
      this.getUserInfo()
      this.getOwnArticleList()    
    })
  }

  async getUserInfo(){
    this.userInfo = await this._UserService.getUserInfo(this.parameter.userName)
  }

  async getOwnArticleList(){
    this.rows = await this._MainService.getOwnArticleList(this.parameter.userName)
  }

  async deleteArticle(row,type){
    let config = new MatDialogConfig();
    config.data = {
      row : row
    }
    let dialogRef = this.dialog.open(DeleteArticleDialogComponent,config);
    dialogRef.afterClosed().subscribe(res =>{
      if (res){
        this.getOwnArticleList()
      }
    })
  }
}
