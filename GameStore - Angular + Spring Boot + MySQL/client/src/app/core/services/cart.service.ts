import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';

@Injectable()
export class CartService {

  private collectionName: string;
  private url: string;

  constructor(private authUtil: AuthUtil,
              private httpClientService: HttpClientService) {
    this.collectionName = '/cart';
  }

  addGameToCart(cartObject): Observable<Object> {

    return this.httpClientService.post('api/addcart/', JSON.stringify(cartObject), this.authUtil.headersBasic());
  }

  getAllGamesInCart(userId): Observable<Object> {

    this.url = 'api/usercart/' + userId;

    return this.httpClientService.get(this.url, this.authUtil.headersBasic());
  }

  deleteGameFromCart(cartId): Observable<Object> {

    // this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + '/' + cartId;

    return this.httpClientService.delete(this.url, this.authUtil.headersBasic());
  }

  deleteByGameId(gameId): Observable<Object> {

    // this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + `?query={"game":"${gameId}"}`;

    return this.httpClientService.delete(this.url, this.authUtil.headersBasic());
  }
}
