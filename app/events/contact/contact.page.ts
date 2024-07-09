import { Component, OnInit } from '@angular/core';
import { AlertController,NavController,LoadingController,ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Contacts} from '@capacitor-community/contacts';
import { CallbackID, Capacitor } from '@capacitor/core';
import { SuccessPage } from '../success/success.page';
import { HttpService } from '../../services/http.service';
 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
 
export class ContactPage implements OnInit{
 
  filterData:any[] = [];
  contacts:any = [];
  permissionGranted = false;
  totalCheckedCount: number = 0;
 
  contactss: { checked: boolean }[] = [
    { checked: false },
    { checked: false },
  ];
 
  constructor(  
    public modalController: ModalController,
    public router: Router,
    public common:CommonService,
    public loadingController: LoadingController,
    public chatconnect: HttpService,
    public navCtrl: NavController,
    public dataservice: DataService,
    private alertController: AlertController,
    ) {
    this.totalCheckedCount = this.contactss.filter(c => c.checked).length;
  }
  
  doRefresh(refresher:any) {
		this.getContacts();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
  }
  
  checkboxClick(event: any, contact: { checked: boolean }): void {
    contact.checked = !contact.checked;
    this.totalCheckedCount = contact.checked ? this.totalCheckedCount + 1 : this.totalCheckedCount - 1;
    this.dataservice.totalContactCount = this.totalCheckedCount;
  }
 
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
 
  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }
 
  GoNext() {
    this.SubmitEvent();
  }
 
  SubmitEvent() {

    let status: number;
    if (this.dataservice.all_contacts.filter(obj=>obj.checked).length > 0) {
        status = 7; // for show of unpaid invite event
    } else {
        status = 0; //wating for approval
    }

    const userToken = this.dataservice.getUserData();
    this.common.show("Please wait, we are sending invites to your selected contact list...");
    var formData = new FormData();
    if (userToken !== null) {
      formData.append('user_token', userToken);
    }
    formData.append('eventFlag', this.dataservice.eventFlag);
    formData.append('payment_status', status.toString());
    formData.append('communityId', this.dataservice.communityId);
    formData.append('location', this.dataservice.locationn);
    formData.append('emergency_contact', this.dataservice.emergency_contact);
    formData.append('event_cusine_type', JSON.stringify(this.dataservice.event_cusine_type));
    formData.append('event_food_type', JSON.stringify(this.dataservice.event_food_type));
    formData.append('original_event_images', this.dataservice.orginalImage);
   
    const eventImages = localStorage.getItem('event_images');
    if (eventImages !== null && !this.dataservice.isNullOrUndefined(eventImages)) {
      formData.append('event_images', this.dataservice.convertBase64ToBlob(eventImages));
    }

    this.dataservice.foodImages.forEach((file: File) => {
      formData.append('menu_imgData[]', file);
    });  

    formData.append('events_data', JSON.stringify(this.dataservice.events_form));
    formData.append('guest_contacts', JSON.stringify(this.dataservice.all_contacts.filter(obj => obj.checked)));
    
    this.chatconnect.postFormData(formData,"create_event").then((result:any)=>{
      this.common.hide();
      if(result.Response.status == 1){
        localStorage.removeItem('event_images');
        localStorage.removeItem('menu_imgData');
        this.closeModal();
        if (this.dataservice.all_contacts.filter(obj=>obj.checked).length > 0) {
          this.dataservice.user_event_data.id = result.Response.event_id;
          this.router.navigate(['/event-payment',{invite_type: "invite",type:"free_event"}]);
          this.dataservice.tokenUrl = result.Response.token_url;
        } else {
          this.dataservice.tokenUrl = result.Response.token_url;
          this.OpenSuccess(this.dataservice.tokenUrl);
        }
      }else{
        this.common.presentToast("Oops",result.Response.message)
      }        
    },(err)=>{
      this.common.hide();
      console.log("Connection failed Messge");
    });
  }
 
  async OpenSuccess(params: any){
    this.dataservice.shareable_event_url=params;
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'pindialog-container',
      handle: true,
      // componentProps: {
      //   share_url:params,
      // },
    });
    modal.onDidDismiss().then((data:any) => {
      if(data.data!= undefined){
        if(this.dataservice.shareable_event_url){
          this.closeModal();
          this.navCtrl.navigateRoot('/tabs/dashboard');
        }
 
      }
    });
    return await modal.present();
  }
 
  filterItems(event: { detail: { value: string; }; }){
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.dataservice.all_contacts.filter((st) => {
        return (st.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1 || st.phone_number.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }else{
 
    }
  }
 
  async getContacts(): Promise<void> {
    await Contacts.requestPermissions().then(async (response:any) => {
      if (response.contacts =="granted"){
        this.permissionGranted = true;
        this.loadingController.create({
          spinner: 'lines',
          message: 'Retrieving your contacts. This may take some time. Please wait...',
          cssClass: 'custom-loading',
          backdropDismiss:false
        }).then(async (res) => {
         res.present();
          var retrievedObject = JSON.parse(localStorage.getItem('cust_contacts') || 'null');

         if(this.dataservice.ValidateArray(retrievedObject)){
          const projection = {
            name: true,
            phones: true,
          };
          await Contacts.getContacts({projection}).then(async (contacts:any) => {
            await contacts.contacts.forEach((contact: { name: { display: any; }; phones: string | any[]; },idx: any) => {
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
              this.contacts.sort((a: { [key: string]: string; },b: { [key: string]: string; }) => {return this.compareObjects(a, b, 'name') });
            })

            const unique: any[] = [];
            this.contacts.forEach((x: any) => {
              if (!unique.some((a: any) => a.phone_number === x.phone_number)) {
                unique.push(x);
              }
            });
            localStorage.setItem('cust_contacts', JSON.stringify(unique));
            this.dataservice.all_contacts=unique;
            this.filterData =unique
            res.dismiss();
          });
 
        }else{
          this.dataservice.all_contacts=retrievedObject;
          this.filterData =retrievedObject
          res.dismiss();
        }
      });
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