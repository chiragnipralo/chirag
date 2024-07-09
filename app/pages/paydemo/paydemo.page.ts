import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, IonSlides, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Browser } from '@capacitor/browser';
import { PluginListenerHandle } from '@capacitor/core';

//declare var RazorpayCheckout: any;

import { Checkout } from 'capacitor-razorpay';

@Component({
  selector: 'app-paydemo',
  templateUrl: './paydemo.page.html',
  styleUrls: ['./paydemo.page.scss'],
})
  
export class PaydemoPage implements OnInit {
  
  paymentHistory = [];
  paymentRecivedHistory = [];
  segment: number = 0;

  constructor(sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public commonservice: CommonService,
    private alertController: AlertController,
    public dataservice: DataService,
    public navCtrl: NavController,
    public chatconnect: HttpService,
    public modalController: ModalController,
    public createv4omdal: ModalController,
    public successmodal: ModalController,
    public router: Router){
  }  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.PaymentInfo();
  }

  @ViewChild('slider', { static: true })
  private slider!: IonSlides;
  
	async segmentChanged() {
		await this.slider.slideTo(this.segment);
	  }
	
	  slideChanged() {
		this.slider.getActiveIndex().then(index => {     
		  console.log("Current index: " + index);
		  this.segment = index;
		});
    }
  
  sendPayPdf(params: any) {
    console.log("pdf",params)
    let apidata={
      user_token: this.dataservice.getUserData(),
      pdf_data:params
    }
    this.chatconnect.postData(apidata,"payment_pdf").then((result:any)=>{
      if (result.Response.status == 1) {
        this.commonservice.presentToast("",result.Response.message)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    }); 
  }
  
  PaymentInfo(){
    this.commonservice.show();
    let apidata={
      user_token:this.dataservice.getUserData(),
    }
    this.chatconnect.postData(apidata,"payment_history").then((result:any)=>{
      this.commonservice.hide();
      if(result.Response.status ==1){
        this.paymentHistory = result.Response.payment_history;
        this.paymentRecivedHistory = result.Response.payment_received_history;
        console.log("History==>",this.paymentHistory)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{ 
      console.log("Connection failed Messge");
    });    
  }

}