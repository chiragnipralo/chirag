import { Component, OnInit } from '@angular/core';
import { AlertController,NavController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fav-cat',
  templateUrl: './fav-cat.page.html',
  styleUrls: ['./fav-cat.page.scss'],
})

export class FavCatPage implements OnInit {

  constructor( public commonservice:CommonService,
    private _router: Router,
    public dataservice: DataService,
    public nav: NavController,
    public authservice: AuthenticationService,
    public chatconnect: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  ChangeAccess(ev,value){
    value.checked=!value.checked;
  }

  async RegisterUser(){

    this.commonservice.show("Please Wait");
    let apidata={
      favoutite_data:JSON.stringify(this.dataservice.favourites.filter(obj=>obj.checked)),
      user_data:this.dataservice.set_user_signup,
    }
    this.chatconnect.postData(apidata,"user_register").then((result:any)=>{
      this.commonservice.hide();
      if(result.Response.status ==1){
        this.authservice.isAuthenticated.next(true);
        this.dataservice.setUserData(result.Response.user_token);
        // this._router.navigate(['/tabs'])
        this.nav.navigateRoot(['/tabs']);
        // this.dataservice.setOtp(result.Response.code)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      this.commonservice.hide();
      console.log("Connection failed Messge");
    });    
  }

  closeModal(){
    if(this.dataservice.favourites.filter(obj=>obj.checked).length > 0){
      this.RegisterUser();
    }else{
      this.commonservice.presentToast("Oops","Please Select atleast one option.")
    }
  }

}
