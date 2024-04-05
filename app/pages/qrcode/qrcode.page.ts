import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { HttpService } from "src/app/services/http.service";
import { CommonService } from "src/app/services/common.service";
import { Location } from "@angular/common";
import { DataService } from "src/app/services/data.service";
import { Browser } from '@capacitor/browser';

@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.page.html",
  styleUrls: ["./qrcode.page.scss"],
})
  
export class QrcodePage implements OnInit {
  scanActive: boolean = false;
  is_event_or_community: string | undefined;
  qr: string | undefined;

  constructor(
    private _router: Router,
    public dataservice: DataService,
    public commonservice: CommonService,
    public chatconnect: HttpService,
    private route: ActivatedRoute,
    private location: Location,
    private platform: Platform,
    private alertController:AlertController,
    private navCtrl: NavController
  ) {
    this.qr = "urqr";
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.scanActive = params["scanActive"] === "true";
      this.is_event_or_community = params["is_event_or_community"];
      console.log("IF Event",this.is_event_or_community);
      if (this.scanActive) {
        this.startScanner();
      }
    });
  }

  async checkPermission() {
    return new Promise(async (resolve: any, reject: any) => {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();

        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      console.log("Result:", result);
      
      if (result.hasContent) {
        this.scanActive = false;
        // const keyValuePairs = result.content.split("?");
        // const queryString = keyValuePairs[1];
        // const token = queryString.replace("token=", "");
        console.log("params1:",this.is_event_or_community);
        console.log("Condition Result:",this.is_event_or_community == 'true')
        if (this.is_event_or_community === 'true') {
          const url = new URL(result.content);
          const token = url.searchParams.get("token");
          const status = url.searchParams.get("status");
          const type = url.searchParams.has("type") ? url.searchParams.get("type") : 0;

          let apidata = {
            user_token:this.dataservice.getUserData(),
            token: token,
            type: status,
            is_premium: type
          };
          this.chatconnect.postData(apidata, "view_event_details_by_scan").then(
            (result: any) => {
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                if (result.Response.eve == 1) {
                  this.view_details(result.Response.geteventid, result.Response.is_premium);
                } else if (result.Response.comm == 2) {
                  this.view_detailss(result.Response.getcommunityid,result.Response.is_premium);
                }
              } else {
                this.commonservice.presentToast("Oops", result.Response.message);
              }
            },
              (err) => {
                console.log("Connection failed Messge");
              }
            );
        } else if (this.is_event_or_community === 'false') {
          const redirect_url = new URL(result.content);
          console.log("URL ==>",redirect_url.href)
          console.log("Redirect URL:", redirect_url.href)
          this.location.back();
          await Browser.open({ url: redirect_url.href.toString(), windowName: '_system' });
        }else {
          alert("NO DATA FOUND!");
        }
      }
    }
  }
  
  view_details(params: any,is_premium: any) {
    console.log(params);
    this.dataservice.setEventData(params);
    if (is_premium == 0) {
      this._router.navigate(["/detailseve"]);
    } else {
      this._router.navigate(["/event-details"]);
    }
  }

  view_detailss(params: any,is_premium: any) {
    console.log(params);
    this.dataservice.setCommunityData(params);
    if (is_premium == 0) { 
      this._router.navigate(["/community-details"]);
    } else {
      this._router.navigate(["/premium-community-details"]); 
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
    this._router.navigate(["/tabs/dashboard"]);
    //this.navCtrl.back();
  }

  ionViewWillEnter() {
    //this.platform.backButton.subscribeWithPriority(10, async () => {
      // const alert = await this.alertController.create({
      //   header: 'Click on Back Button!',
      // });
      // await alert.present();
      //return;
    //});
  }
  
  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
}