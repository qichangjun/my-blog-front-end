import { Component, OnInit } from '@angular/core';
import { LoginInfo } from './login-info';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog.component';
declare var Cookies:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo = new LoginInfo('','')
  constructor(
    public _LoginService : LoginService,
    private router: Router,
    private MatDialogConfig : MatDialogConfig,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    Cookies.remove('current_user_token')
  }

  async login(){
    let res = await this._LoginService.login(this.loginInfo)
    Cookies.set('current_user_token', 
    {accessToken:res.token});
    Cookies.set('current_user_info',
    {
      userName : res.userName,
      role : res.role
    }
  )
    this.router.navigate(['/main']);
  }

  register(){
    let config = new MatDialogConfig();
    let dialogRef = this.dialog.open(RegisterDialogComponent,config);     
  }
}
