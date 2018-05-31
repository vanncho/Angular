import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { GameService } from '../../core/services/game.service';
import { CartService } from '../../core/services/cart.service';
import { MyGamesService } from '../../core/services/mygames.service';
import { AuthUtil } from '../../core/utils/auth.util';
import { CookieManagerService } from '../../core/services/cookie-manager.service';

@Component({
  selector: 'app-home-basic',
  templateUrl: './home-basic.component.html',
  styleUrls: ['./home-basic.component.css']
})
export class HomeBasicComponent implements OnInit, OnDestroy {

  private subscriptionAddGameToCart: ISubscription;
  private subscriptionGetAllGames: ISubscription;
  private subscriptionGetAllGamesByUser: ISubscription;
  private subscriptionGetGameById: ISubscription;
  public admin: boolean;
  public games: any;

  constructor(private cookieService: CookieManagerService,
              private mygamesService: MyGamesService,
              private gameService: GameService,
              private cartService: CartService,
              private toastr: ToastsManager, vcr: ViewContainerRef, 
              private authUtil: AuthUtil) {
      this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit(): void {

    this.admin = this.authUtil.isAdmin();
    this.getAllGames();
  }

  addToCard(gameId, gameTitle): void {

   const userId = this.cookieService.get('userid');

   this.subscriptionAddGameToCart = this.cartService.addGameToCart({userId: userId, gameId: gameId}).subscribe(() => {

      this.toastr.success('Added to your cart!', gameTitle);

     }, error => {

      if (error.status === 400) {
        this.toastr.warning('Is already in your cart!', gameTitle);
      }
     }
   );
  }

   getAllUserGames(): void {

    const userId = this.cookieService.get('userid');

    this.subscriptionGetAllGames = this.gameService.getAllUserGames(userId).subscribe(data => {

        this.games = data;
        localStorage.setItem('prevUrl', '/home');
      }
    );
  }

  getAllGames(): void {

    this.subscriptionGetAllGames = this.gameService.getAllGames().subscribe(data => {

      this.games = data;

        localStorage.setItem('prevUrl', '/home');
      }
    );
  }

  isAutenticated(): boolean {

    return this.cookieService.get('authtoken') !== undefined;
  }

  ngOnDestroy(): void {

    if (this.subscriptionAddGameToCart) {
      this.subscriptionAddGameToCart.unsubscribe();
    }

    if (this.subscriptionGetAllGames) {
      this.subscriptionGetAllGames.unsubscribe();
    }

    if (this.subscriptionGetAllGamesByUser) {
      this.subscriptionGetAllGamesByUser.unsubscribe();
    }

    if (this.subscriptionGetGameById) {
      this.subscriptionGetGameById.unsubscribe();
    }
  }
}
