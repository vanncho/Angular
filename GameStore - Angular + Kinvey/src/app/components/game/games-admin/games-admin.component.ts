import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';

import {GameService} from '../../../core/services/game.service';

@Component({
  selector: 'app-games-admin',
  templateUrl: './games-admin.component.html',
  styleUrls: ['./games-admin.component.css']
})
export class GamesAdminComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  public games: any;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {

    this.subscription = this.gameService.getAllGames().subscribe(data => {

        this.games = data;
        localStorage.setItem('prevUrl', '/games');
      }
    );
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
