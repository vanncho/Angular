import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';

@Injectable()
export class MyGamesService {

  private collectionName: string;
  private url: string;

  constructor(private authUtil: AuthUtil,
              private httpClientService: HttpClientService) {
    this.collectionName = '/mygames';
  }

  getAllGamesByUser(userId): Observable<Object> {

    this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + `?query={"user":"${userId}"}`;

      return this.httpClientService.get(this.url, this.authUtil.headersKinvey());
  }

  addToMyGames(gameObject): Observable<Object> {

    this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName;

    return this.httpClientService.post(this.url, JSON.stringify(gameObject), this.authUtil.headersKinvey());
  }

}
