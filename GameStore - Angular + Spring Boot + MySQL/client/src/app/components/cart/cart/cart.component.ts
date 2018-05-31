import { Component, OnChanges, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { CartService } from '../../../core/services/cart.service';
import { GameService } from '../../../core/services/game.service';
import { MyGamesService } from '../../../core/services/mygames.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

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
  private subscriptionEmptyCard: ISubscription;
  private errorOnOrder: boolean;
  public cartData: any;
  public totalSum: number;

  constructor(private cartService: CartService,
              private gameService: GameService,
              private mygamesService: MyGamesService,
              private cookieService: CookieManagerService,
              private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.totalSum = 0;
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {

    const userId = this.cookieService.get('userid');
    let cartObj;
    const newCartData = [];

    this.subscriptionGetAllGames = this.cartService.getAllGamesInCart(userId).subscribe(games => {

        const arrayOfGames = Object.values(games);

        for (const game of arrayOfGames) {

          cartObj = this.fillCartData(game);

          this.totalSum += cartObj.price;
          newCartData.push(cartObj);
        }
      }
    );

    this.cartData = newCartData;
  }

  removeFromCart(gameId, gameTitle): void {

    const userId = this.cookieService.get('userid');
    let cartObj;
    let sumAfterRemove = 0;
    const newCartData = [];

    this.subscriptionDeleteGame = this.cartService.deleteGameFromCart({userId: userId, gameId: gameId}).subscribe(games => {

      const arrayOfGames = Object.values(games);

      for (const game of arrayOfGames) {

        cartObj = this.fillCartData(game);

        sumAfterRemove += game.price;
        newCartData.push(cartObj);
      }

      this.totalSum = sumAfterRemove;
      this.cartData = newCartData;
      this.toastr.success('Removed from your cart!', gameTitle);

    });
  }

  makeOrder(): void {

    const userId = this.cookieService.get('userid');

    let buyCardModel = {
      userId: userId,
      games: []
    }

    for(let card of Object.values(this.cartData)) {

      buyCardModel.games.push(card['gameId']);
    }

    console.log(buyCardModel);
    this.subscriptionEmptyCard = this.cartService.makeOrderForUser(userId, buyCardModel).subscribe(() => {

      this.totalSum = 0;
      this.cartData = [];
      this.toastr.success('Order is successful');
      
    }, error => {
    });     
  }

  private fillCartData(game): any {

    let cartObj = {
      gameId: game['id'],
      title: game['title'],
      imageUrl: game['thumbnail'],
      description: game['description'].substring(0, 150),
      price: game['price']
    };

    return cartObj;
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

    if (this.subscriptionEmptyCard) {
      this.subscriptionEmptyCard.unsubscribe();
    }
  }
}
