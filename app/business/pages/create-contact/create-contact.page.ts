import { Component, OnInit } from '@angular/core';
import { AlertController,NavController,LoadingController,ModalController } from '@ionic/angular';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Contacts} from '@capacitor-community/contacts';
import { CallbackID, Capacitor } from '@capacitor/core';
import { CreatePermPage } from '../create-perm/create-perm.page';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {

  filterData:any = [];
  contacts:any= [];
  permissionGranted = false;
  totalCheckedCount: number = 0;

  constructor(  
   public modalController: ModalController,
   public router: Router,
   // public navParams:NavParams,
   public common:CommonService,
   public loadingController: LoadingController,
   public chatconnect: HttpService,
   public navCtrl: NavController,
   public dataservice: DataService,
   private alertController: AlertController,
   ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Allow 'Contact Access' to access your contacts while you are using the app",
      buttons: [{
        text: "Don't Allow",
        cssClass: 'alert-button',
        // handler: () => {
        //   console.log('Confirm Cancel: blah');
        //   this.router.navigate(['/tabs/account']);
        // },
      },{
        text: 'Allow',
        cssClass: 'alert-button',
        handler: () => {
          console.log('Confirm Cancel: blah');
          this.getPermissions();
        },
      },],

    });

    await alert.present();
  }

  async getPermissions(){
    if (Capacitor.isNativePlatform()){
      const perm = await Contacts.requestPermissions();
      return {
        granted: perm.contacts === "granted"
      }
    }
  }

  ngOnInit() {
    console.log("This is First Count=>", this.totalCheckedCount);
    console.log("This is event Data ==> ", this.dataservice.user_event_data);
    console.log("Event data", this.dataservice.events_form);
    const localStorageItem = localStorage.getItem('cust_contacts');
  
    if (localStorageItem !== null) {
      var retrievedObject = JSON.parse(localStorageItem);
  
      if (this.dataservice.ValidateArray(retrievedObject)) {
        this.filterData = retrievedObject;
        this.dataservice.all_contacts = retrievedObject;
        this.permissionGranted = true;
      }
    }
  }
  
  checkboxClick(event: { detail: any; },contact: { checked: boolean; }){
    console.log(event.detail)
    console.log(name,contact)
    contact.checked=!contact.checked;    
  }

  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }

  GoNext(){
    this.SubmitEvent();  
  }

  SubmitEvent() {
    const userToken = this.dataservice.getUserData();
    const id = this.dataservice.GetAccountuser();
    this.common.show("Please wait, we are sending invites to your selected contact list...");
    var formData = new FormData();
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
    formData.append('type', '2');
    formData.append('account_id', id);
    formData.append('event_food_type', JSON.stringify(this.dataservice.event_food_type));
    formData.append('event_cusine_type', JSON.stringify(this.dataservice.event_cusine_type));
    const eventImages = localStorage.getItem('event_images');
    if (eventImages !== null && !this.dataservice.isNullOrUndefined(eventImages)) {
      formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
    }
    
    this.dataservice.foodImages.forEach((file: File) => {
      formData.append('menu_imgData[]', file);
    });

    formData.append('events_data', JSON.stringify(this.dataservice.events_form));
    formData.append('guest_contacts', JSON.stringify(this.dataservice.all_contacts.filter(obj=>obj.checked)));
    console.log(formData);

    this.chatconnect.postFormData(formData,"create_paid_event").then((result:any)=>{
      this.common.hide();
      if(result.Response.status ==1){
        // this.closeModal();
        this.OpenSuccess(result.Response.token_url);
        this.common.presentToast("", result.Response.message)
        localStorage.removeItem('event_images');
      }else{
        this.common.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      this.common.hide(); 
      console.log("Connection failed Messge");
    });    
  }

  async OpenSuccess(params: any) {
    console.log("Modal Open Event Created")
    this.dataservice.shareable_event_url=params;
    const modal = await this.modalController.create({
      component: CreatePermPage,
      cssClass: 'pindialog-container',
      handle: true,
      // componentProps: {
      //   share_url:params,
      // },
    });
    modal.onDidDismiss().then((data:any) => {
      console.log("DATA HERE --->",data)
      if(data.data!= undefined){
        if(this.dataservice.shareable_event_url){
          this.closeModal();
        }
      }
    });
    return await modal.present();
  }


  filterItems(event:any){
    console.log(event.detail.value)
    console.log(event.detail.value.length)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.dataservice.all_contacts.filter((st) => {
      // this.filterData = this.dataservice.all_contacts.filter((st) => {
        return (st.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1 || st.phone_number.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }else{

    }
  }

  async getContacts(): Promise<void> {
    await Contacts.requestPermissions().then(async (response:any) => {
      console.log("PERMISSONS RRESp ===>",response)
      if (response.contacts == "granted") {
        this.permissionGranted = true;
        console.log("below granted  RRESp ===>")
        this.loadingController.create({
          spinner: 'lines',
          message: 'Retrieving your contacts. This may take some time. Please wait...',
          cssClass: 'custom-loading',
          backdropDismiss:false
        }).then(async (res) => {
         res.present();
         var retrievedObject = JSON.parse(localStorage.getItem('cust_contacts') || 'null');
         console.log(retrievedObject)
         console.log("retrievedObject ===>",retrievedObject)
         if(this.dataservice.ValidateArray(retrievedObject)){
          const projection = {
            name: true,
            phones: true,
          };
          console.log("ABOVE AWAIT contact ===>");
          await Contacts.getContacts({projection}).then(async (contacts:any) => {
            console.log("MY CONTACTS ==>",contacts)
            await contacts.contacts.forEach((contact: { name: { display: any; }; phones: string | any[]; },idx: any) => {
              console.log(contact);
              if(contact.name){
                if(contact.name.display){
                  if(contact.phones){
                    for(let y = 0; y<contact.phones.length; y++){
                      if(contact.phones[y].number.length >9){
                        this.contacts.push({'name':contact.name.display,'phone_number':contact.phones[y].number.replace(/\D/g, '').slice(-10)});
                      }
                    }
                  }
                }
              }
              this.contacts.sort((a: any,b: any) => {return this.compareObjects(a, b, 'name') });
            })
            const unique: any[] = [];
            this.contacts.forEach((x: any) => {
              if (!unique.some((a: any) => a.phone_number === x.phone_number)) {
                unique.push(x);
              }
            });
            console.log(unique);
            localStorage.setItem('cust_contacts', JSON.stringify(unique));
            this.dataservice.all_contacts=unique;
            console.log("ASSIGN CONAT CFILTER DAAS ")
            this.filterData =unique
            console.log("ASSIGN CONAT CFILTER DAAS ",this.filterData)
            console.log(this.dataservice.all_contacts)
            res.dismiss();
          });

        }else{
          this.dataservice.all_contacts=retrievedObject;
          this.filterData =retrievedObject
          console.log(this.dataservice.all_contacts)          
          res.dismiss();
        }
      });
      }else{
        // this.commonservice.presentToast("Oops","Contact Permission Denied")
      }
    })
  }
  
  compareObjects(object1: { [key: string]: string }, object2: { [key: string]: string }, key: string) {
    let obj1 = object1[key]?.toUpperCase();
    let obj2 = object2[key]?.toUpperCase();

    if (obj1 < obj2) { return -1; }
    if (obj1 > obj2) { return 1; }

    return 0;
  }

}

