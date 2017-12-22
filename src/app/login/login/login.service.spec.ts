import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Http } from '@angular/http';
import { ConstantService } from '../../core/service/constant.service';
import { ApiUrlService } from '../../core/service/api.service';
import { ServiceHandleService } from '../../core/service/service-handle.service';

class ConstantServiceStub {
  baseUrl(){return 'api'}  
}



let loginService : LoginService;
let http : Http;
let constantService = new ConstantServiceStub
let apiUrlService = new ApiUrlService()
let serviceHandleService : ServiceHandleService


describe('LoginService', () => {
  beforeEach(()=>{ loginService = new LoginService(http,constantService,apiUrlService,serviceHandleService);})

  it('should be created', ()=>{
    expect(loginService).toBeTruthy();
  });
});
