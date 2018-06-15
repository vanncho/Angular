import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { EventService } from '../../../core/services/event.service';
import { EventListModel } from '../../../core/models/view/event-list.model';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit, OnDestroy {

  private subscriptionGetAllEvents: ISubscription;
  private subscriptionDeleteEvent: ISubscription;
  private subscriptionDeleteTicket: ISubscription;
  private events: Array<EventListModel>;

  constructor(private eventService: EventService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadAllEvents();
  }

  private loadAllEvents(): void {

    this.subscriptionGetAllEvents = this.eventService.getAllEvents().subscribe((data) => {

      this.events = Object.values(data);

    });
  }

  private getTicketsForEvent(event, eventId): void {

    const classes = event.target.parentElement.parentElement.nextSibling.nextSibling.classList;

    this.changeButton(classes);
  }

  private changeButton(classes): void {

    if (classes.contains('hiddenRow')) {

      classes.remove('hiddenRow');
      classes.add('showedRow');

    } else {

      classes.remove('showedRow');
      classes.add('hiddenRow');

    }
  }

  private deleteEvent(eventId) {

    this.subscriptionDeleteEvent = this.eventService.deleteEvent(eventId).subscribe(() => {

      for (const event of this.events) {

        if (event.id === eventId) {

          const index = this.events.indexOf(eventId);
          this.events.splice(index, 1);
          break;
        }
      }

    }, (error) => {

    });
  }

  private deleteTicket(ticketId, eventId) {

    this.subscriptionDeleteTicket = this.ticketService.deleteTicket(ticketId).subscribe(() => {

      const index = this.events.indexOf(ticketId);
      this.events.splice(index, 1);

    }, (error) => {

    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetAllEvents) {
      this.subscriptionGetAllEvents.unsubscribe();
    }

    if (this.subscriptionDeleteEvent) {
      this.subscriptionDeleteEvent.unsubscribe();
    }

    if (this.subscriptionDeleteTicket) {
      this.subscriptionDeleteTicket.unsubscribe();
    }
  }
}
