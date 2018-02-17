import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {ToastrService} from 'ngx-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {AuthenticationService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;

  constructor(private authenticationService: AuthenticationService,
              private _cookieService: CookieService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.subscription = this.authenticationService.logout().subscribe(data => {

        localStorage.clear();
        this._cookieService.removeAll();
        this.toastr.success('You have logout successfully.');
        this.router.navigate(['/login']);
      },
      err => {
        this.toastr.error(err.error.description);
      }
    );
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
}
