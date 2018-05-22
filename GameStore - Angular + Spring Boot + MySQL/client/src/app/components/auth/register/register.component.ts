import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {RegisterModel} from '../../../core/models/inputs/register.model';
import {AuthenticationService} from '../../../core/services/auth.service';

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
              private toastr: ToastrService,
              private router: Router) {
    this.model = new RegisterModel('', '', '', '', '');
  }

  ngOnInit(): void {
  }

  register(): void {

    const fullNameRegex = new RegExp(/^([A-Z]+[a-z]+ [A-Z]+[a-z]+)$/);
    const usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
    const passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);

    if (fullNameRegex.test(this.model.fullName) &&
      usernameRegex.test(this.model.username) &&
      passwordRegex.test(this.model.password)) {

      const registerModel = new RegisterModel(this.model.fullName, this.model.email, this.model.username, this.model.password);

      this.subscription = this.authentication.register(registerModel).subscribe(data => {

        this.successfulRegister(data);
        this.toastr.success('Registration successfully.');
        this.router.navigate(['/login']);

      });
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
