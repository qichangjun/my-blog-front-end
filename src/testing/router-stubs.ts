
import { Directive, Input,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

//--------------routerLink模拟指令-------------------
@Directive({
    selector: '[routerLink]',
    host: {
      '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

//--------------queryParams模拟指令-------------------
@Directive({
    selector: '[queryParams]',
    host: {
      '(click)': 'onClick()'
    }
})
export class queryParamsStubDirective {
    @Input('queryParams') linkParams: any;
    queryParams: any = null;

    onClick() {
        this.queryParams = this.linkParams;
    }
}

//--------------queryParamsHandling模拟指令-------------------
@Directive({
    selector: '[queryParamsHandling]',
    host: {
      '(click)': 'onClick()'
    }
})
export class queryParamsHandlingStubDirective {
    @Input('queryParamsHandling') linkParams: any;
    queryParamsHandling: any = null;

    onClick() {
        this.queryParamsHandling = this.linkParams;
    }
}


//--------------ActivatedRoute模拟指令-------------------
export class ActivatedRouteStub {    
    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    queryParams = this.subject.asObservable();  
    params = this.subject.asObservable();      
    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(paramter: {}) {
      this._testParams = paramter;
      this.subject.next(paramter);
    }
  
    // ActivatedRoute.snapshot.params
    get snapshot() {
      return { params: this.testParams };
    }
  }

  //-------------- Router模拟指令 -------------------
export class RouterStub {
    navigateByUrl(url: string) { return url; }
    navigate(url:string){
      return url
    }
  }
