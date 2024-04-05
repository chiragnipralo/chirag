import { Component, OnInit } from '@angular/core';
import { AlertController,NavController,LoadingController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Contacts} from '@capacitor-community/contacts';
import { CallbackID, Capacitor } from '@capacitor/core';
import { HttpService } from '../../services/http.service';
 
@Component({
  selector: 'app-reinvite',
  templateUrl: './reinvite.page.html',
  styleUrls: ['./reinvite.page.scss'],
})
 
export class ReinvitePage implements OnInit {
 
  filterData: any[] = [];
  contacts: any[] = [];
  permissionGranted = false;
  totalCheckedCount: number = 0;

  contactss: { checked: boolean }[] = [
    { checked: false },
    { checked: false },
  ];
 
  constructor(  
    public router: Router,
    public common:CommonService,
    public loadingController: LoadingController,
    public chatconnect: HttpService,
    public navCtrl: NavController,
    private _route: ActivatedRoute,
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
 
  filterItems(event: { detail: { value: string; }; }) {
    if (!this.dataservice.isNullOrUndefined(event.detail.value)) {
      this.filterData = this.dataservice.all_contacts.filter((st: { name: string; phone_number: string }) => {
        return (
          st.name.toLowerCase().includes(event.detail.value.toLowerCase()) ||
          st.phone_number.toLowerCase().includes(event.detail.value.toLowerCase())
        );
      });
    }
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Allow 'Contact Access' to access your contacts while you are using the app",
      buttons: [{
        text: "Don't Allow",
        cssClass: 'alert-button',
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

  async getContacts(): Promise<void> {
    await Contacts.requestPermissions().then(async (response:any) => {
      if (response.contacts == "granted"){
        this.permissionGranted = true;
          this.loadingController.create({
            spinner: 'lines',
            message: 'Retrieving your contacts. This may take some time. Please wait...',
            cssClass: 'custom-loading',
            //backdropDismiss:false
          }).then(async (res) => {
          res.present();
          var retrievedObject = JSON.parse(localStorage.getItem('cust_contacts') || 'null');
          
          if(!this.dataservice.ValidateArray(retrievedObject)){
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
                this.contacts.sort((a,b) => {return this.compareObjects(a, b, 'name') });
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

  GoNext() {
    if (this.dataservice.all_contacts.filter(obj => (obj as any).checked).length > 0) {
      this.router.navigate(['/event-payment', { type: this._route.snapshot.params['type'] }]);
    } else {
      this.common.presentToast("", "Please Select Contact.");
    }
  }

  compareObjects(object1: { [key: string]: string }, object2: { [key: string]: string }, key: string) {
    let obj1 = object1[key]?.toUpperCase();
    let obj2 = object2[key]?.toUpperCase();

    if (obj1 < obj2) { return -1; }
    if (obj1 > obj2) { return 1; }

    return 0;
  }
}