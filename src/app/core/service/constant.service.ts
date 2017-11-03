import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable()
export class ConstantService {

  constructor() { }

  baseUrl() {
    return environment.baseUrl;
  }
}
