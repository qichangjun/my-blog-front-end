import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs,RequestOptions,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { ConstantService } from '../../core/service/constant.service';
import { ApiUrlService } from '../../core/service/api.service'
import { ServiceHandleService } from '../../core/service/service-handle.service';
import { AuthService } from '../../core/service/auth.service';


@Injectable()
export class MainService {

  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    public _ServiceHandleService : ServiceHandleService,
    private _AuthService:AuthService
  ) { }

  createArticle(paramete ?) : Promise<any> {    
    let params = new URLSearchParams();
    let post_data = Object.assign({},paramete)
    post_data.token = this._AuthService.getCurrentUser().accessToken
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['createArticle'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  editArticle(paramete ?) : Promise<any> {    
    let params = new URLSearchParams();
    let post_data = Object.assign({},paramete)
    post_data.token = this._AuthService.getCurrentUser().accessToken
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['editArticle'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  getArticleLists(paramete ?) : Promise<any> {        
    let params = new URLSearchParams();
    let post_data = Object.assign({},paramete)
    post_data.token = this._AuthService.getCurrentUser().accessToken
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getArticleLists'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  getOwnArticleList(userName) : Promise<any> {        
    let params = new URLSearchParams();
    let post_data = {
      userName : userName
    }    
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getOwnArticleList'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  deleteArticle(id) : Promise<any> {        
    let params = new URLSearchParams();
    let post_data = {
      token : this._AuthService.getCurrentUser().accessToken,
      id : id
    }    
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['deleteArticle'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  getLabelLists(value?) : Promise<any> {        
    let params = new URLSearchParams();
    let post_data = {
      token : this._AuthService.getCurrentUser().accessToken,
      keyword : value
    }    
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getLabelLists'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }

  addLabel(value) : Promise<any> {        
    let params = new URLSearchParams();
    let post_data = {
      token : this._AuthService.getCurrentUser().accessToken,
      label : value
    }    
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['addLabel'],post_data,{search:params})
                    .toPromise()
                    .then(res =>
                      this._ServiceHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._ServiceHandleService.handleError(error)
                    );
  }
}
