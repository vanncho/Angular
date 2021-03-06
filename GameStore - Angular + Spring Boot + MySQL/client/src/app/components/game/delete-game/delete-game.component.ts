import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { AddEditModel } from '../../../core/models/inputs/add-edit-game.model';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent implements OnInit, OnDestroy {

  private subscriptionGetGameById: ISubscription;
  private subscriptionDeleteGame: ISubscription;
  private currGameId: any;
  public error: string;
  public game: AddEditModel;

  constructor(private router: Router,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private route: ActivatedRoute,
              private gameService: GameService) {
    this.game = new AddEditModel('', '', '', 0, 0, '', '');
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.currGameId = this.route.params['value'].id;

    this.subscriptionGetGameById = this.gameService.getGameById(this.currGameId).subscribe(data => {
        this.game.title = data['title'];
        this.game.description = data['description'];
        this.game.thumbnail = data['thumbnail'];
        this.game.price = data['price'];
        this.game.size = data['size'];
        this.game.video = data['video'];
        this.game.date = data['date'];
      }
    );
  }

  deleteGame(): void {

    const prevUrl = localStorage.getItem('prevUrl');

    this.subscriptionDeleteGame = this.gameService.deleteGame(this.currGameId).subscribe(() => {

        this.toastr.success('Removed from store!', this.game.title);
        setTimeout(() => {
          this.router.navigate([prevUrl]);
        }, 900);

      }, error => {

        if (error.status === 400) {
          this.toastr.error('Opps! Not deleted!', this.game.title);
        }
      }
    );
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetGameById) {
      this.subscriptionGetGameById.unsubscribe();
    }

    if (this.subscriptionDeleteGame) {
      this.subscriptionDeleteGame.unsubscribe();
    }
  }
}
