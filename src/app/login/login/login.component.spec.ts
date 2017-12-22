import { async, ComponentFixture, TestBed,inject, fakeAsync,tick } from '@angular/core/testing';


import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { MatFormFieldModule,MatInputModule,MatDialogConfig,MatDialog } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ShareModule } from '../../share/share.module';
import { By } from '@angular/platform-browser';

declare var Cookies:any;
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService : LoginService;

  class RouterStub {
    navigateByUrl(url: string) { return url; }
    navigate(url:string){
      return url
    }
  }

  class LoginServiceSpy{
    login = jasmine.createSpy('login').and.callFake(
      (params) => Promise.resolve(true).then(() => {         
          expect(params.userName).toBe('qichangjun');
          expect(params.password).toBe('123456');          
          return {
              role: "admin",
              token : "12345",
              userName:"qichangjun"
          }
        }
      ))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({    
      declarations:[LoginComponent],  
      imports:[ShareModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
      providers : [MatDialogConfig,MatDialog]
    })
    .overrideComponent(LoginComponent,{
      set: {
        providers:[
          { provide: Router,      useClass: RouterStub },
          {provide:LoginService,useClass:LoginServiceSpy}
        ]
      }
    })
    .compileComponents();    
  }));


  it('should create', () => {
    let fixture = TestBed.createComponent(LoginComponent);
    let component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy();
  });

  it('should send login message',fakeAsync(()=> {
    let fixture = TestBed.createComponent(LoginComponent);
    let component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy();
    component.loginInfo.userName = 'qichangjun'
    fixture.detectChanges();
    component.loginInfo.password = '123456'
    fixture.detectChanges();
    const loginBtn = fixture.debugElement.query(By.css('#login-button')).nativeElement;  
    loginBtn.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let userInfo = Cookies.getJSON('current_user_info')
    expect(userInfo.userName).toBe('qichangjun')
    expect(userInfo.role).toBe('admin')    
    let userToken = Cookies.getJSON('current_user_token')
    expect(userToken.accessToken).toBe('12345')    
  }))
});
