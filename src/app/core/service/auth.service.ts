import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams } from '@angular/http';

declare var Cookies:any;
@Injectable()
export class AuthService {

  constructor() { }

  getCurrentUser() {    
    return Cookies.getJSON('hs_dmportal_current_user') || {}
  }
  
  getCurrentLanguage() {
    return localStorage.getItem('currentLanguage') || 'zh_CN'
  }

  getCurrentUserInfo(){
    return Cookies.getJSON('currentUserInfo') || {}
  }

  getCurrentRole(){
    return Cookies.getJSON('currentRole') || null
  }
}
