import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  // @ViewChild(IonContent, { static: true }) content: IonContent;
  public canInfinite = false;

  chat_events=[];
  imageBg = 'chat-bg';

  @ViewChild(IonContent)
  content!: IonContent;
  @ViewChild('chat_input')
  messageInput!: ElementRef;
  
  chat_events_messages:any = [];
  editorMsg = '';
  current_user_id!: number;
  current_chat_type!: number;
  showEmojiPicker = false;

  constructor(

    public commonservice:CommonService,
    public dataservice: DataService,  
    public chatconnect: HttpService,
    public modalController: ModalController,
    public platformService: PlatformService,
    ) {

  }

  ngOnInit() {

  }

  listChats(){
    console.log(this.dataservice.user_event_chat_data)
    console.log(this.dataservice.user_event_chat_data)    
    let apidata={
      user_id:this.dataservice.user_event_chat_data.user_id,
      user_token:this.dataservice.getUserData(),
      event_id: this.dataservice.user_event_chat_data.event_id,
      chat_type: this.dataservice.user_event_chat_data.chat_type,
      is_premium:this.dataservice.user_event_chat_data.is_premium
    }
    console.log("This is API Data ==>", apidata)
    this.chatconnect.postData(apidata, "get_event_chats_by_userid_and_eventid").then((result:any) => {
      console.log('result', result);
      this.chat_events_messages=result.Response.event_chats;
      this.current_user_id=result.Response.current_user_id;
      this.current_chat_type=result.Response.current_chat_type;
      console.log('chatdata', this.chat_events_messages);
      console.log("This is chat type ==> ",this.current_chat_type)
    }, (err) => {
      console.log("Connection failed Messge");
    });
  } 

  ionViewDidEnter() {
    this.listChats();
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.scrollToBottom();
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;
    console.log("IM HERE ") 
    let apidata={
      "user_id": this.dataservice.user_event_chat_data.user_id,
      "event_id": this.dataservice.user_event_chat_data.event_id,
      "chat_message": this.editorMsg,
      "chat_type": this.dataservice.user_event_chat_data.chat_type,
      "is_premium": this.dataservice.user_event_chat_data.is_premium
    }

    this.chatconnect.postData(apidata, "add_events_chats").then((result:any) => {
      console.log(result)
      this.chat_events_messages.push({"user_id": this.current_user_id,
        "event_id": this.dataservice.user_event_chat_data.event_id,
        "message": this.editorMsg,
        "user_initials": this.dataservice.getInitials(this.dataservice.user_profile_data.user_name),
        "chat_type": this.dataservice.user_event_chat_data.chat_type,
        "is_premium": this.dataservice.user_event_chat_data.is_premium
      });
      console.log(this.chat_events_messages)
      this.editorMsg = '';
      this.scrollToBottom();
      this.listChats();
    }, (err) => {
      console.log("Connection failed Messge");
    });
  }

  scrollToBottom(){
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }
  
  public getMoreMessagesI(e: any): void {}

  public logScrolling(e: { detail: { currentY: number; }; }): void {
    // console.log("logScrolling ------->",e.detail.currentY)
    this.canInfinite = e.detail.currentY > 10;
  }
  async openModal(originalEventImages: string[]) {
    console.log("This Is Image:",originalEventImages)
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        originalEventImages: originalEventImages
      }
    });
    return await modal.present();
  }
}