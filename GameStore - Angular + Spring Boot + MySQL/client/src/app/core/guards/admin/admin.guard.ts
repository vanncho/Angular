import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private _cookieService: CookieService,
              private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.checkUserIsAdmin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkUserIsAdmin(route.path);
  }

  checkUserIsAdmin(url: string): boolean {

    if (this._cookieService.get('userrole') === 'admin') {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
