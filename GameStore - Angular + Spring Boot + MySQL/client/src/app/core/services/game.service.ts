import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {

  private url: string;

  constructor(private authUtil: AuthUtil,
              private httpClientService: HttpClientService,
              private httpClient: HttpClient) {
  }

  getAllGames(): Observable<Object> {

    return this.httpClientService.get('/api/allGames', this.authUtil.headersBasic());
  }

  getGameById(gameId): Observable<Object> {

    this.url = '/api/details/' + gameId;

    return this.httpClientService.get(this.url, this.authUtil.headersBasic());
  }

  editGame(gameId, gameObject): Observable<Object> {

    this.url = 'api/edit/' + gameId;

    return this.httpClientService.put(this.url, JSON.stringify(gameObject), this.authUtil.headersBasic());
  }

  addGame(gameObject): Observable<Object> {

    return this.httpClientService.post('api/add', JSON.stringify(gameObject), this.authUtil.headersBasic());
  }

  deleteGame(gameId): Observable<Object> {

    this.url = 'api/delete/' + gameId;

    return this.httpClientService.delete(this.url, this.authUtil.headersBasic());
  }
}
