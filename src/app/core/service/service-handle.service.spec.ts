import { TestBed, inject } from '@angular/core/testing';

import { Http, Headers, Response,URLSearchParams,ResponseOptions } from '@angular/http';
import { ServiceHandleService } from './service-handle.service';
import { Router } from '@angular/router';
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('ServiceHandleService without the TestBed',()=>{
  let service : ServiceHandleService;
  let router : Router;
  beforeEach(()=>{ service = new ServiceHandleService(router);})

  it('#handleError should return error value', async () => {
    service = new ServiceHandleService(router)
    try{
      let err = await service.handleError({message:'error!!!!'})
    }catch(err){
      expect(err).toBe('error!!!!');
    }
  });

  it('#extractData with code : 1 ,return body.data', () => {
    service = new ServiceHandleService(router)    
    let response : Response = new Response(new ResponseOptions({body:{code:1,data:'操作成功'}}))
    let res = service.extractData(response)
    expect(res).toBe('操作成功');    
  });

  it('#extractData with code : 0 ,return error message',async () => {
    service = new ServiceHandleService(router)    
    let response : Response = new Response(new ResponseOptions({body:{code:0,message:'发生错误'}}))
    try{
      let res = await service.extractData(response)
    }catch(err){
      expect(err).toBe('发生错误');    
    }        
  });

  it('#extractDataSuccess with code : 1 ,return body.data', () => {
    service = new ServiceHandleService(router)    
    let response : Response = new Response(new ResponseOptions({body:{code:1,data:'操作成功'}}))
    let res = service.extractDataSuccess(response)
    expect(res).toBe('操作成功');    
  });

  it('#extractDataSuccess with code : 0 ,return error message',async () => {
    service = new ServiceHandleService(router)    
    let response : Response = new Response(new ResponseOptions({body:{code:0,message:'发生错误'}}))
    try{
      let res = await service.extractDataSuccess(response)
    }catch(err){
      expect(err).toBe('发生错误');    
    }        
  });
  
})
