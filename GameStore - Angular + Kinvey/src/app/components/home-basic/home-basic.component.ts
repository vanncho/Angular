import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {GameService} from '../../core/services/game.service';
import {CartService} from '../../core/services/cart.service';
import {MyGamesService} from '../../core/services/mygames.service';
import {AuthUtil} from '../../core/utils/auth.util';

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

  constructor(private _cookieService: CookieService,
              private mygamesService: MyGamesService,
              private gameService: GameService,
              private cartService: CartService,
              private authUtil: AuthUtil,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit(): void {

    this.admin = this.authUtil.isAdmin();
    this.getAllGames();
  }

  addToCard(gameId, gameTitle): void {

    const userId = this._cookieService.get('userid');

    this.subscriptionAddGameToCart = this.cartService.addGameToCart({user: userId, game: gameId}).subscribe(data => {

        this.toastr.success('Added to your cart!', gameTitle);
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

  getAllUserGames(): void {

    const userId = this._cookieService.get('userid');

    this.subscriptionGetAllGamesByUser = this.mygamesService.getAllGamesByUser(userId).subscribe(data => {

        const currentGames = [];

        for (const myGame of Object.values(data)) {

          this.subscriptionGetGameById = this.gameService.getGameById(myGame.game).subscribe(g => {

              currentGames.push(g);
            }
          );
        }

        this.games = currentGames;
      }
    );
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
