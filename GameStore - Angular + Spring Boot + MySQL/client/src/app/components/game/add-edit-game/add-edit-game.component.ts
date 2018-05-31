import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import { GameService } from '../../../core/services/game.service';
import { AddEditModel } from './../../../core/models/inputs/add-edit-game.model';

@Component({
  selector: 'app-add-edit-game',
  templateUrl: './add-edit-game.component.html',
  styleUrls: ['./add-edit-game.component.css']
})
export class AddEditGameComponent implements OnInit, OnDestroy {

  private subscriptionGetGameById: ISubscription;
  private subscriptionEditGame: ISubscription;
  private subscriptionAddGame: ISubscription;
  private currGameId: any;
  public error: string;
  public action: string;
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

    if (this.currGameId === '0') {
      this.action = 'Add';
    } else {
      this.action = 'Edit';

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
  }

  processGame(): void {

    const prevUrl = localStorage.getItem('prevUrl');
    if (this.currGameId !== '0') {

      this.subscriptionEditGame = this.gameService.editGame(this.currGameId, this.game).subscribe(() => {

          this.toastr.success('Edited successfully!', this.game.title);
          setTimeout(() => {
            this.router.navigate([prevUrl]);
          }, 900);

        }, error => {

          if (error.status === 400) {
            this.toastr.error('Opps! Not edited!', this.game.title);
          }
        }
      );
    } else {

      this.subscriptionAddGame = this.gameService.addGame(this.game).subscribe(() => {

          this.toastr.success('Added successfully!', this.game.title);
          setTimeout(() => {
            this.router.navigate([prevUrl]);
          }, 900);

        }, error => {

          if (error.status === 400) {
            this.toastr.error('Opps! Not added!', this.game.title);
          }
        }
      );
    }
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetGameById) {
      this.subscriptionGetGameById.unsubscribe();
    }

    if (this.subscriptionEditGame) {
      this.subscriptionEditGame.unsubscribe();
    }

    if (this.subscriptionAddGame) {
      this.subscriptionAddGame.unsubscribe();
    }

  }
}
