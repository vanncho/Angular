import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ISubscription} from 'rxjs/Subscription';

import {AddEditModel} from '../../../core/models/inputs/add-edit-game.model';
import {GameService} from '../../../core/services/game.service';

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
              private route: ActivatedRoute,
              private gameService: GameService,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
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

    this.subscriptionDeleteGame = this.gameService.deleteGame(this.currGameId).subscribe(data => {

        this.toastr.success('Removed from store!', this.game.title);
        this.router.navigate([prevUrl]);
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
