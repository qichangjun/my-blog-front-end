import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlService {

  login = '/api/users/login'
  register = '/api/users/registerUser'
  getUserInfo = '/api/users/getUserInfo'
  createArticle = '/api/art/createArticle'
  editArticle = '/api/art/editArticle'
  getArticleLists = '/api/art/getArticleLists'
  deleteArticle = '/api/art/deleteArticle'
  getOwnArticleList = '/api/art/getOwnarticleLists'

  getArticleDetail = '/api/art/getArticleDetail'
  updateCheckTimes = '/api/art/updateCheckTimes'
  addReply = '/api/art/addReply'
  addChildReply = '/api/art/addChildReply'

  deleteReply = '/api/art/deleteReply'

  uploadImg = '/api/upload/uploadImg'


  getLabelLists = '/api/label/getLabelLists'
  addLabel = '/api/label/addLabel'
}
