import { Injectable } from '@angular/core';

import { Http, Headers, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
declare var toastr:any;
@Injectable()
export class ServiceHandleService {

  constructor(
    private router: Router
  ) {}

  public handleError(error: any): Promise<any> {
    // toastr.error('链接失败')     

    return Promise.reject(error.message || error);

  }

  public extractData(res: Response) {
    let body = res.json();    
    if (body.code == 1){
      return body.data || { };
    }else{
      if (body.data == '用户不存在'){
        this.router.navigate(['/login']);
      }
      toastr.error(body.message)      
      return Promise.reject(body.message);
    }    
  }

  public extractDataSuccess(res: Response) {      
    let body = res.json();    
    if (body.code == 1){      
      toastr.success(body.message)
      return body.data || { };
    }else{        
      if (body.data == '用户不存在'){
        this.router.navigate(['/login']);
      }    
      toastr.error(body.data,body.message)    
      return Promise.reject(body.message);
    }    
  }
}
