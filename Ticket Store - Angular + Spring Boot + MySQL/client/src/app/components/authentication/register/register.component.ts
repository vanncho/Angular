import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { RegisterModel } from '../../../core/models/binding/register.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;

  constructor(private authentication: AuthenticationService,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router,
              private toasterOptions: ToastOptions) {
    this.model = new RegisterModel('', '', '', '', '', '');
    this.toastr.setRootViewContainerRef(vcr);
    this.toasterOptions.dismiss = 'click';
  }

  ngOnInit(): void {
  }

  register(): void {

    const nameRegex = new RegExp(/^([A-Z]+[a-z]+)$/);
    const usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
    const passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);

    if (nameRegex.test(this.model.firstName) &&
        nameRegex.test(this.model.lastName) &&
        usernameRegex.test(this.model.username) &&
        passwordRegex.test(this.model.password)) {

      const registerModel = new RegisterModel(
        this.model.firstName,
        this.model.lastName,
        this.model.email,
        this.model.username,
        this.model.password
      );

      if (this.model.password !== this.model.confirmPassword) {
        this.toastr.error('Password and Repeat Password don\'t match!');
      } else {

        this.subscription = this.authentication.register(registerModel).subscribe(data => {

          this.successfulRegister(data);
          this.toastr.success('Registration successfully.');
          this.router.navigate(['/login']);

        });
      }
    }
  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
