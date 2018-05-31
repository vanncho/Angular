import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CookieManagerService} from '../../core/services/cookie-manager.service';

import 'rxjs/add/observable/throw';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient,
              private toastr: ToastsManager,
              private cookieService: CookieManagerService) {
  }

  public get<T>(url: string, headers: object) {

    return this.http
      .get<T>(url, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public post<T>(url: string, body: any, headers: object) {

    return this.http
      .post<T>(url, body, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }


  public put<T>(url: string, body: any, headers: object): Observable<Object> {

    return this.http
      .put<T>(url, body, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }


  public delete<T>(url: string, headers: object) {

    return this.http
      .delete<T>(url, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err: any) {

    if (err.status === 401 || err.status === 504) {
      this.cookieService.removeLoginData();
    }

    if (err.status === 400) {

      return Observable.throw(err);

    } else {

      this.toastr.error(err.status + ' : ' + err.statusText);
      return Observable.throw(new Error(err.status + ' : ' + err.statusText));
    }

  }
}
