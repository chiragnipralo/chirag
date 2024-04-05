import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { ActivatedRoute } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { CommonService } from "../../services/common.service";
import { DataService } from "../../services/data.service";
import { HttpService } from "../../services/http.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-manageqr",
  templateUrl: "./manageqr.page.html",
  styleUrls: ["./manageqr.page.scss"],
})
export class ManageqrPage {
  scanActive: boolean = false;
  qr: string | undefined;
  params1: any;
  constructor(
    public commonservice: CommonService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    this.qr = "urqr";
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.scanActive = params["scanActive"] === "true";
      this.params1 = params["event_id"];

      console.log("this is id in qr page ID ==> ",this.params1)
      if (this.scanActive) {
        this.startScanner();
      }
    });
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
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
      let event_id: string;

      if (result.hasContent) {
        this.scanActive = false;
        const keyValuePairs = result.content.split(",");
        // let user_id = keyValuePairs[0];
        let token = keyValuePairs[0];
        let event_id = keyValuePairs[2];
        let type = keyValuePairs[3] !== undefined ? keyValuePairs[3] : 0;

        // console.log("User_id==>",user_id)
        // console.log("User_name==>",user_name)
        // console.log("Event_id==>",event_id)
        // console.log("Event_type==>",type)

        if (parseInt(event_id) == this.params1) {
          // console.log("Event ID From QR ==> ", parseInt(event_id))
          // console.log("This Is Event ID ==>", this.params1);
          
          let apidata = {
            event_id: event_id,
            // user_id: user_id,
            token: token,
            type:type
          };
  
          this.chatconnect.postData(apidata, "qr_scanned").then(
            (result: any) => {
              if (result.Response.status == 1) {
                this.commonservice.presentToast("", result.Response.message);
                this.scanActive = false;
                this.navCtrl.back();
                //this.location.back();
              } else {
                this.commonservice.presentToast("", result.Response.message);
                this.scanActive = false;
                this.navCtrl.back();
                //this.location.back();
              }
            },
            (err) => {
              console.log("Connection failed Messge");
            }
          );
        } else {
          console.log("Event ID From QR ==> ", parseInt(event_id))
          console.log("This Is Event ID ==>", this.params1);
          this.commonservice.presentToast("Not Found","Not Valid For This Event");
        }
        
      } else {
        alert("NO DATA FOUND!");
      }
    } else {
      alert("NOT ALLOWED!");
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
    this.navCtrl.back();
    //this.modalCtrl.dismiss();

  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
}