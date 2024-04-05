import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {

  constructor(
    public commonservice:CommonService,
    public dataservice: DataService,  
    public modalController: ModalController,
    private _route: ActivatedRoute,
    public mapmodal: ModalController,
    public chatconnect: HttpService,
    private _router: Router,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
  }

  handleBackButtonClick() {
    console.log('Back button clicked');
    this._router.navigate(['/tabs/dashboard'])
  }
}
