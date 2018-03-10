import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services/auth.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public admin: boolean;

  constructor(private authenticationService: AuthenticationService,
              private _cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  showHideNavigation() {

    return this.authenticationService.isLoggedIn();
  }

  isAdmin() {

    const role = this._cookieService.get('userrole');

    if (role === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    return this.admin;
  }

}
