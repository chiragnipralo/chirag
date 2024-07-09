import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { IonSearchbar } from '@ionic/angular';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  // chat_events = [];
  community_chats = [];
  showSearchBar = false;
  searchQuery = '';
  chat_events: { event_name: any }[] = [];
  filterData: { event_name: string }[] = [];
  @ViewChild('searchBar', { read: ElementRef }) searchBarRef!: ElementRef<IonSearchbar>;

  toggleSearchBar() {
		this.showSearchBar = !this.showSearchBar;
		if (this.showSearchBar) {
			setTimeout(() => {
				const searchBar = this.searchBarRef.nativeElement;
				searchBar.setFocus();
			}, 100);
		} else {
			this.searchQuery = '';
		}
	}
  
  doRefresh(refresher:any) {
    this.ionViewDidEnter()
    setTimeout(() => {
     refresher.target.complete();
   }, 2000);
  }

  filterItems(event:any){
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.chat_events.filter((data) => {
        return (data.event_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }

  segment: string;
  
  constructor(
    public commonservice:CommonService,
    public dataservice: DataService,  
    public chatconnect: HttpService,
    public modalController: ModalController,
    private _router: Router
    ) { 
    this.segment = "chat";
  }

  ngOnInit() {
    console.log("ENter 11")
  }

  listChats() {
    let apidata = {
      user_token: this.dataservice.getUserData(),
    };
    this.chatconnect.postData(apidata, "get_all_event_chats").then((result: any) => {
      this.chat_events = [];

      if (Array.isArray(result.Response.event_chats)) {
        this.chat_events = this.chat_events.concat(result.Response.event_chats);
      }

      if (Array.isArray(result.Response.community_chats)) {
        this.chat_events = this.chat_events.concat(result.Response.community_chats);
      }

      if (Array.isArray(result.Response.paid_community_chats)) {
        this.chat_events = this.chat_events.concat(result.Response.paid_community_chats);
      }

      //this.filterData = this.chat_events;
      this.filterData = this.chat_events.sort((a: any, b: any) => {
        const dateA = new Date(a.latest_chat_date);
        const dateB = new Date(b.latest_chat_date);
        return dateB.getTime() - dateA.getTime();
      });
    
      console.log("Final Result ==>", this.filterData);
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  navigatetoChat(params:any){
    this.dataservice.user_event_chat_data=params;
    this._router.navigate(['chat-detail'])
  }
  
  chat_connect(){
   this._router.navigate(['pages/chat-contact'])
  }

  ionViewDidEnter(){
    console.log("ENter")
    this.listChats();
  }

  async openModal(originalEventImages: string[]) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        originalEventImages: originalEventImages
      }
    });
    return await modal.present();
  }
}
