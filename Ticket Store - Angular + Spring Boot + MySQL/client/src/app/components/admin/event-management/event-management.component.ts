import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { EventService } from '../../../core/services/event.service';
import { EventListModel } from '../../../core/models/view/event-list.model';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit, OnDestroy {

  private subscriptionGetAllEvents: ISubscription;
  private events: Array<EventListModel>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadAllEvents();
  }

  private loadAllEvents() {

    this.subscriptionGetAllEvents = this.eventService.getAllEvents().subscribe((data) => {

      console.log(data);
      this.events = Object.values(data);

    });
  }

  private getTicketsForEvent(event, eventId) {

    const classes = event.target.parentElement.parentElement.nextSibling.nextSibling.classList;

    // LOAD TICKETS
    this.changeButton(classes);
  }

  private changeButton(classes) {

    if (classes.contains('hiddenRow')) {

      classes.remove('hiddenRow');
      classes.add('showedRow');

    } else {

      classes.remove('showedRow');
      classes.add('hiddenRow');

    }
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetAllEvents) {
      this.subscriptionGetAllEvents.unsubscribe();
    }
  }
}
