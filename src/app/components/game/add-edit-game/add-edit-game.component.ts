import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ISubscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import {GameService} from '../../../core/services/game.service';
import {AddEditModel} from './../../../core/models/inputs/add-edit-game.model';

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
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private gameService: GameService) {
    this.game = new AddEditModel('', '', '', 0, 0, '', '');
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

      this.subscriptionEditGame = this.gameService.editGame(this.currGameId, this.game).subscribe(data => {

          this.toastr.success('Edited successfully!', this.game.title);
          this.router.navigate([prevUrl]);
        }
      );
    } else {

      this.subscriptionAddGame = this.gameService.addGame(this.game).subscribe(data => {

          this.toastr.success('Added successfully!', this.game.title);
          this.router.navigate([prevUrl]);
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
