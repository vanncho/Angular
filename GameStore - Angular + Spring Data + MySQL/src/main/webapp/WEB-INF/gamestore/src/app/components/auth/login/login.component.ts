import {Component, OnInit, OnDestroy} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {LoginModel} from '../../../core/models/inputs/login.model';
import {AuthenticationService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  public model: LoginModel;
  public loginFail: boolean;
  public username: string;
  public invalidUsername: boolean;
  public invalidPassword: boolean;

  constructor(private authentication: AuthenticationService,
              private _cookieService: CookieService,
              private toastr: ToastrService,
              private router: Router) {
    this.model = new LoginModel('', '');
  }

  ngOnInit(): void {
  }

  login(): void {

    const usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
    const passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);

    if (usernameRegex.test(this.model.username) && passwordRegex.test(this.model.password)) {

      this.subscription = this.authentication.login(this.model).subscribe(data => {

          console.log(data);
        
          this.successfulLogin(data);
          this.toastr.success('You have login successfully.');
        
      });
    } else {
      this.invalidUsername = true;
      this.invalidPassword = true;
    }
  }

  successfulLogin(data): void {

    this._cookieService.put('authtoken', data.token);
    this._cookieService.put('userrole', data['role']);
    this._cookieService.put('userid', data['id']);
    localStorage.setItem('authtoken', data.token);
    localStorage.setItem('username', data['username']);
    this.loginFail = false;
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
