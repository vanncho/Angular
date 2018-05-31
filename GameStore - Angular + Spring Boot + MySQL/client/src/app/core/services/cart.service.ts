import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthUtil } from '../utils/auth.util';
import { HttpClientService } from './http-client.service';

@Injectable()
export class CartService {

  private collectionName: string;
  private url: string;

  constructor(private authUtil: AuthUtil,
              private httpClientService: HttpClientService) {
    this.collectionName = '/cart';
  }

  addGameToCart(cartObject): Observable<Object> {

    return this.httpClientService.post('api/addToCart/', JSON.stringify(cartObject), this.authUtil.headersBasic());
  }

  getAllGamesInCart(userId): Observable<Object> {

    this.url = 'api/userCart/' + userId;

    return this.httpClientService.get(this.url, this.authUtil.headersBasic());
  }

  deleteGameFromCart(cartObject): Observable<Object> {

    this.url = 'api/removeFromCart/';

    return this.httpClientService.post(this.url, JSON.stringify(cartObject), this.authUtil.headersBasic());
  }

  makeOrderForUser(userId, buyCardModel): Observable<Object> {

    this.url = 'api/order/' + userId;

    return this.httpClientService.post(this.url, JSON.stringify(buyCardModel.games), this.authUtil.headersBasic());
  }
}
