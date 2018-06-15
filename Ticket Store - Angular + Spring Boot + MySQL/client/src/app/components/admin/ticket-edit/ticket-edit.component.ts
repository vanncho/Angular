import { Component, OnInit, trigger, transition, style, animate, keyframes } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css'],
  animations: [
    trigger('alertAnim', [
    transition('void => *', [
        animate(400, keyframes([
            style({opacity: 0, transform: 'translateY(-20px)'}),
            style({opacity: 1, transform: 'translateY(0)'})
        ]))
    ])
])
]
})
export class TicketEditComponent implements OnInit {

  private rForm: FormGroup;
  private post: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.validateFrom();
  }

  private editTicket(): void {

  }

  private validateFrom(): void {

    this.rForm = this.formBuilder.group({
      'price': [0, Validators.compose([Validators.required, Validators.min(1)])],
      'ticketsCount': [0, Validators.compose([Validators.required, Validators.min(1)])],
      'priceCategory': [null, Validators.compose([Validators.required, Validators.minLength(3)])] // Regex => Validators.patern('')
    });
  }

  // private fillDataToModel(): void {

  //   this.rForm.valueChanges.subscribe((data) => {

  //     this.ticket['price'] = data['price'];
  //     this.ticket['ticketsCount'] = data['ticketsCount'];
  //     this.ticket['priceCategory'] = data['priceCategory'];
  //   });
  // }

}
