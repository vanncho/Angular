import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {AuthenticationService} from '../../../core/services/auth.service';
import {CookieManagerService} from '../../../core/services/cookie-manager.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {

    this.subscription = this.authenticationService.logout().subscribe(data => {

        this.cookieService.removeLoginData();
        
        this.toastr.success('You have logout successfully.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);

      }, err => {
        this.toastr.error(err.error.description);
      }
    );
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
}
