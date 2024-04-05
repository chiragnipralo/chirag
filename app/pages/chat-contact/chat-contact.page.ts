import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.page.html',
  styleUrls: ['./chat-contact.page.scss'],
})
export class ChatContactPage implements OnInit {

  showSearchBar = false;
  searchQuery = '';

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
    this.searchQuery = '';
    }
  }
  doRefresh(refresher: { target: { complete: () => void; }; }) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
  constructor() { }

  ngOnInit() {
  }

}
