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
export class TopicService {

  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    public _ServiceHandleService : ServiceHandleService,
    private _AuthService:AuthService
  ) { }

  

  getArticleDetail(paramete ?) : Promise<any> {    
    let params = new URLSearchParams();
    params.set('id',paramete.id)    
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getArticleDetail'],{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  updateCheckTimes(paramete ?) : Promise<any> {    
    let params = new URLSearchParams();
    let post_data = Object.assign({},paramete)
    post_data.token = this._AuthService.getCurrentUser().accessToken
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['updateCheckTimes'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  addReply(id,parameters) : Promise<any>{
    let params = new URLSearchParams();
    let post_data = Object.assign({},parameters)
    post_data.id = id
    post_data.token = this._AuthService.getCurrentUser().accessToken
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['addReply'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  addChildReply(artId,id,parameters) : Promise<any>{
    let params = new URLSearchParams();
    let post_data = Object.assign({},parameters)
    post_data.id = id
    post_data.artId = artId
    post_data.token = this._AuthService.getCurrentUser().accessToken
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['addChildReply'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  deleteReply(id,artId) : Promise<any>{
    let params = new URLSearchParams();
    let post_data = {
      id : id,
      artId : artId,
      token : this._AuthService.getCurrentUser().accessToken
    }    
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['deleteReply'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }
}
