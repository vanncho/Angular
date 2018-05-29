import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ISubscription} from 'rxjs/Subscription';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {AddEditModel} from '../../../core/models/inputs/add-edit-game.model';
import {GameService} from '../../../core/services/game.service';
import {AuthUtil} from '../../../core/utils/auth.util';

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  public currGameId: any;
  public admin: boolean;
  public prevUrl: string;
  public error: string;
  public game: AddEditModel;

  constructor(private authUtil: AuthUtil,
              private route: ActivatedRoute,
              private toastr: ToastsManager, vcr: ViewContainerRef, 
              public sanitizer: DomSanitizer,
              private gameService: GameService) {
    this.game = new AddEditModel('', '', '', 0, 0, '', '');
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {

    this.admin = this.authUtil.isAdmin();
    this.currGameId = this.route.params['value'].id;

    this.subscription = this.gameService.getGameById(this.currGameId).subscribe(data => {

        this.game.title = data['title'];
        this.game.description = data['description'];
        this.game.thumbnail = data['thumbnail'];
        this.game.price = data['price'];
        this.game.size = data['size'];
        this.game.video = data['video'];
        this.game.date = data['date'];
    }
      // }, err => {
      //   //this.toastr.error(err);
      // }
    );

    this.prevUrl = localStorage.getItem('prevUrl');
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
