import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { LoginModel } from '../../../core/models/inputs/login.model';
import { AuthenticationService } from '../../../core/services/auth.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

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
              private cookieService: CookieManagerService,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router) {
    this.model = new LoginModel('', '');
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
  }

  login(): void {

    const usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
    const passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);

    if (usernameRegex.test(this.model.username) && passwordRegex.test(this.model.password)) {

      this.subscription = this.authentication.login(this.model).subscribe(data => {

        this.cookieService.saveLoginData(data);

        this.loginFail = false;

        this.toastr.success('You have login successfully.');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 900);

      });

    } else {
      this.invalidUsername = true;
      this.invalidPassword = true;
    }
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
