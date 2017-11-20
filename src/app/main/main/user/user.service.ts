import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs,RequestOptions,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { ConstantService } from '../../../core/service/constant.service';
import { ApiUrlService } from '../../../core/service/api.service'
import { ServiceHandleService } from '../../../core/service/service-handle.service';
import { AuthService } from '../../../core/service/auth.service';


@Injectable()
export class UserService {

  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    public _ServiceHandleService : ServiceHandleService,
    private _AuthService:AuthService
  ) { }

  getUserInfo(userName) : Promise<any> {    
    let params = new URLSearchParams();
    params.set('userName',userName)    
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getUserInfo'],{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }
}
