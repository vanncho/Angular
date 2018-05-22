import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {

  private collectionName: string;
  private url: string;

  constructor(private authUtil: AuthUtil,
              private httpClientService: HttpClientService,
              private httpClient: HttpClient) {
    this.collectionName = '/games';
  }

  getAllGames(): Observable<Object> {

    return this.httpClientService.get('/api/allGames', this.authUtil.headersBasic());
  }

  getGameById(gameId): Observable<Object> {

    this.url = '/api/details/' + gameId;

    return this.httpClientService.get(this.url, this.authUtil.headersBasic());
  }

  editGame(gameId, gameObject): Observable<Object> {

    this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + '/' + gameId;

    return this.httpClientService.put(this.url, JSON.stringify(gameObject), this.authUtil.headersKinvey());
  }

  addGame(gameObject): Observable<Object> {

    this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName;

    return this.httpClientService.post(this.url, JSON.stringify(gameObject), this.authUtil.headersKinvey());
  }

  deleteGame(gameId): Observable<Object> {

    this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + '/' + gameId;

    return this.httpClientService.delete(this.url, this.authUtil.headersKinvey());
  }
}
