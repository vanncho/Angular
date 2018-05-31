import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public admin: boolean;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService) {
  }

  ngOnInit(): void {
  }

  showHideNavigation() {

    return this.authenticationService.isLoggedIn();
  }

  isAdmin() {

    const role = this.cookieService.get('userrole');

    if (role === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    return this.admin;
  }

}
