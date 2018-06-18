import { Component, OnDestroy, OnInit, ViewContainerRef, trigger, transition, style, animate, keyframes } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { RegisterModel } from '../../../core/models/binding/register.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('alertAnim', [
    transition('void => *', [
        animate(400, keyframes([
            style({opacity: 0, transform: 'translateY(-20px)'}),
            style({opacity: 1, transform: 'translateY(0)'})
        ]))
    ])
])
]
})
export class RegisterComponent implements OnInit, OnDestroy {

  private rForm: FormGroup;
  private post: any;
  private subscription: ISubscription;
  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;

  constructor(private formBuilder: FormBuilder,
              private authentication: AuthenticationService,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router,
              private toasterOptions: ToastOptions) {
    this.model = new RegisterModel('', '', '', '', '', '');
    this.toastr.setRootViewContainerRef(vcr);
    this.toasterOptions.dismiss = 'click';
  }

  ngOnInit(): void {
    this.validateForm(this.model.firstName,
                      this.model.lastName,
                      this.model.username,
                      this.model.email,
                      this.model.password,
                      this.model.confirmPassword);
  }

  private register(): void {

    // const nameRegex = new RegExp(/^([A-Z]+[a-z]+)$/);
    // const usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
    // const passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);

    // if (nameRegex.test(this.model.firstName) &&
    //     nameRegex.test(this.model.lastName) &&
    //     usernameRegex.test(this.model.username) &&
    //     passwordRegex.test(this.model.password)) {

    //   const registerModel = new RegisterModel(
    //     this.model.firstName,
    //     this.model.lastName,
    //     this.model.email,
    //     this.model.username,
    //     this.model.password
    //   );

      // if (this.model.password !== this.model.confirmPassword) {
      //   this.toastr.error('Password and Repeat Password don\'t match!');
      // } else {

        this.model['firstName'] = this.rForm.controls['firstName'].value;
        this.model['lastName'] = this.rForm.controls['lastName'].value;
        this.model['email'] = this.rForm.controls['email'].value;
        this.model['username'] = this.rForm.controls['username'].value;
        this.model['password'] = this.rForm.controls['password'].value;
console.log(this.model);
        // this.subscription = this.authentication.register(registerModel).subscribe(data => {

        //   this.successfulRegister(data);
        //   this.toastr.success('Registration successfully.');
        //   this.router.navigate(['/login']);

        // });
      // }
    // }
  }

  private successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }

  private validateForm(firstName, lastName, username, email, password, confirmPassword): void {

    this.rForm = this.formBuilder.group({
      'firstName': [firstName, Validators.compose([Validators.required, Validators.pattern('^([A-Z]+[a-z]+)$')])],
      'lastName': [lastName, Validators.compose([Validators.required, Validators.pattern('^([A-Z]+[a-z]+)$')])],
      'username': [username, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'email': [email, Validators.compose([Validators.required, Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')])],
      'password': [password, Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9]{3,}$')])],
      'confirmPassword': [confirmPassword, Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9]{3,}$')])]
    }, { validator: this.passwordConfirming });

  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {

      if (c['controls'].password.value !== c['controls'].confirmPassword.value) {
        return { invalid: true };
      }

      return { invalid: false };
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
