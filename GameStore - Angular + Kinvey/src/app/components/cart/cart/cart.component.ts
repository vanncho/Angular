import {Component, OnChanges, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {CartService} from '../../../core/services/cart.service';
import {GameService} from '../../../core/services/game.service';
import {MyGamesService} from '../../../core/services/mygames.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges, OnDestroy {

  private subscriptionGetAllGames: ISubscription;
  private subscriptionGetGameById: ISubscription;
  private subscriptionDeleteGame: ISubscription;
  private subscriptionAddGamesToCart: ISubscription;
  private subscriptionDeleteByGameId: ISubscription;
  private errorOnOrder: boolean;
  public cartData: any;
  public totalSum: number;

  constructor(private cartService: CartService,
              private gameService: GameService,
              private mygamesService: MyGamesService,
              private _cookieService: CookieService,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.totalSum = 0;
  }

  ngOnInit(): void {

    const userId = this._cookieService.get('userid');
    let cartObj;
    const myCartData = [];

    this.subscriptionGetAllGames = this.cartService.getAllGamesInCart(userId).subscribe(data => {

        for (const currData of Object.values(data)) {

          this.subscriptionGetGameById = this.gameService.getGameById(currData.game).subscribe(gameData => {

            cartObj = {
              id: currData._id,
              gameId: gameData['_id'],
              title: gameData['title'],
              imageUrl: gameData['thumbnail'],
              description: gameData['description'].substring(0, 150),
              price: gameData['price']
            };

            this.totalSum += cartObj.price;
            myCartData.push(cartObj);
          });
        }
      }
    );

    this.cartData = myCartData;
  }

  removeFromCart(cartId, gameTitle): void {

    for (let i = this.cartData.length - 1; i >= 0; i--) {

      if (this.cartData[i].id === cartId) {

        this.subscriptionDeleteGame = this.cartService.deleteGameFromCart(cartId).subscribe(data => {

            this.totalSum -= this.cartData[i].price;
            this.cartData.splice(i, 1);
            this.toastr.success('Removed from your cart!', gameTitle);
          }
        );
      }
    }
  }

  makeOrder(): void {

    const userId = this._cookieService.get('userid');

    for (const cartItem of this.cartData) {

      this.subscriptionAddGamesToCart = this.mygamesService.addToMyGames({
        user: userId,
        game: cartItem.gameId
      }).subscribe(data => {
        },
        err => {
          this.errorOnOrder = true;
        }
      );
    }

    for (let i = this.cartData.length - 1; i >= 0; i--) {

      this.subscriptionDeleteByGameId = this.cartService.deleteByGameId(this.cartData[i].gameId).subscribe(d => {
        },
        err => {
          this.errorOnOrder = true;
        }
      );
    }

    if (this.errorOnOrder === undefined) {
      this.toastr.success('Order is successful');
    }

    this.cartData = [];
    this.totalSum = 0;

  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetAllGames) {
      this.subscriptionGetAllGames.unsubscribe();
    }

    if (this.subscriptionGetGameById) {
      this.subscriptionGetGameById.unsubscribe();
    }

    if (this.subscriptionDeleteGame) {
      this.subscriptionDeleteGame.unsubscribe();
    }

    if (this.subscriptionAddGamesToCart) {
      this.subscriptionAddGamesToCart.unsubscribe();
    }

    if (this.subscriptionDeleteByGameId) {
      this.subscriptionDeleteByGameId.unsubscribe();
    }
  }
}
