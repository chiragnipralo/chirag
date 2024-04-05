import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController,IonContent,AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public canInfinite = false;

  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.ngOnInit();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  @ViewChild(IonContent, { static: false })
  private content!: IonContent; 

  userData = {};
  ApiData:any;
  jData:any = [];
  cData:any;
  userid:any;
  userimg: any = 'assets/images/prof.jfif';
  chat_events_messages = [];
  showMsg:any;
  senderMsg:any;
  image:any;

  constructor(private alertController: AlertController,
    public commonservice:CommonService,
    public sanitizer: DomSanitizer,
    public dataservice: DataService,  
    public modalController: ModalController,
    public chatconnect: HttpService,
    private router: Router) {

  }

  ngOnInit() {
    console.log(this.dataservice?.user_event_data);
    this.listChats();
  }


  listChats(){
    //this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
      event_id:this.dataservice?.user_event_data.id
    }
    this.chatconnect.postData(apidata, "get_event_chats_by_userid_and_eventid").then((result:any) => {
      //this.commonservice.hide();
      this.jData=result.Response.event_chats;
      console.log(this.jData);
    }, (err) => {
      console.log("Connection failed Messge");
    });
  } 

  sendMessage()
  {
    if((this.senderMsg == '') || (this.senderMsg == undefined))
    {
      let smsg="Enter Some Message";
      this.commonservice.presentToast("Oops",smsg)
    } else {
      this.content.scrollToTop(); 
      this.jData.push({ "request": "admin", "user_name": "You", "chat_message":this.senderMsg, "image":this.userimg});

      let apidata={
        user_token:this.dataservice.getUserData(),
        event_id:this.dataservice?.user_event_data.id,
        feedback_message:this.senderMsg,
      }

      console.log(this.jData);  
      this.chatconnect.postData(apidata, "add_events_chats").then((result:any)=>{
        console.log(result)

      }, (err) => {
      });
      this.senderMsg = '';
    }
  }

  public logScrolling(e: { detail: { currentY: number; }; }): void {
    // console.log("logScrolling ------->",e.detail.currentY)
    this.canInfinite = e.detail.currentY > 10;
  }

  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }

}
