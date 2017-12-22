import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LoginInfo } from '../../login-info';
import { LoginService } from '../../login.service';
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerInfo = new LoginInfo()
  constructor(
    public _LoginService : LoginService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close(false)
  }

  async register(){
    await this._LoginService.register(this.registerInfo);
    this.dialogRef.close(false)
  }
}
