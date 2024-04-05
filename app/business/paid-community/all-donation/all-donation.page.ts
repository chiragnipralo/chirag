import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-donation',
  templateUrl: './all-donation.page.html',
  styleUrls: ['./all-donation.page.scss'],
})
export class AllDonationPage implements OnInit {
  segment: string | undefined;
  constructor() {
    this.segment = "week";
   }

  ngOnInit() {
  }

}
