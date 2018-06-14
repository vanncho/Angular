import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {

  private rFrom: FormGroup;
  private post: any;
  private price: number;
  private ticketsCount: number;
  private priceCategory: string;

  constructor(private fb: FormBuilder) {

    this.rFrom = fb.group({
      'price': [0, Validators.compose([Validators.required, Validators.min(0)])],
      'ticketsCount': [0, Validators.compose([Validators.required, Validators.min(0)])],
      'priceCategory': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  addPost(post) {

    this.price = post.price;
    this.ticketsCount = post.ticketsCount;
    this.priceCategory = post.priceCategory;
  }

  ngOnInit() {
  }

}
