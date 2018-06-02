import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public admin: boolean;
  public username: string;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService) {
  }

  ngOnInit(): void {

    this.username = this.cookieService.get('fullName');
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
