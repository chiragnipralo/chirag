import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  segment: string;
  constructor() { 
    this.segment = "chat";
  }
  ngOnInit() {
  }

}
