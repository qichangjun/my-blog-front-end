import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams } from '@angular/http';

declare var Cookies:any;
@Injectable()
export class AuthService {

  constructor() { }

  getCurrentUser() {    
    return Cookies.getJSON('current_user_token') || {}
  }
  
  getCurrentLanguage() {
    return localStorage.getItem('currentLanguage') || 'zh_CN'
  }

  getCurrentUserInfo(){
    return Cookies.getJSON('current_user_info') || {}
  }

  getCurrentRole(){
    return Cookies.getJSON('currentRole') || null
  }
}
