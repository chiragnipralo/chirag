import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { Checkout } from 'capacitor-razorpay';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.page.html',
  styleUrls: ['./choose-plan.page.scss'],
})
export class ChoosePlanPage implements OnInit {

  plandata = [];
  accountData: any;
  paidEventData = [];
  paidCommunityData = [];
  selectedType: any;
  user_data: any;
  selectedEvent: number | undefined;
  selectedDetailId: number | null = null;
  selectedAmount!: number;
  detailsPlan!: any;

  razor_key: string = 'rzp_live_G3jYxHdfoo5gQR';
  currency: string = 'INR';

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public commonservice: CommonService,
    public dataservice: DataService,
    private route: ActivatedRoute,
    public chatconnect: HttpService,
    public router: Router,
    public navCtrl: NavController,
    public loadingController: LoadingController
  ) {
    this.fetchUserProfile();
  }

  ngOnInit() {
    this.selectedType = this.route.snapshot.paramMap.get('select_type') || '';
    console.log("Selected type ==>", this.selectedType);
    console.log("This Account Id ==>", this.dataservice.GetAccountuser());

    this.GetAccountDetails();
    this.GetPaymentPlan();
  }

  fetchUserProfile() {
    const apidata = {
      user_token: this.dataservice.getUserData()
    };
    this.chatconnect.postData(apidata, "user_profile").then((result: any) => {
      console.log(result);
      if (result.Response.status === 1) {
        if (result.Response.user_data) {
          this.dataservice.user_profile_data = result.Response.user_data[0];
          this.user_data = result.Response.user_data[0];
        }
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Message");
    });
  }

  handleEventSelection(details: any) {
    this.detailsPlan = details;
    this.selectedAmount = this.detailsPlan.amount;
    console.log("Stringified plan_info:", JSON.stringify(this.detailsPlan));
  }

  GetAccountDetails() {
    const apidata = {
      user_token: this.dataservice.getUserData(),
      account_id: this.dataservice.GetAccountuser(),
    };
    this.chatconnect.postData(apidata, "account_details").then((result: any) => {
      console.log("This Is Account Details==>", result);
      if (result.Response.status === 1) {
        this.accountData = result.Response.Details;
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Message");
    });
  }

  GetPaymentPlan() {
    const apidata = {
      user_token: this.dataservice.getUserData(),
    };
    this.chatconnect.postData(apidata, "payment_plan").then((result: any) => {
      console.log("This is Plan Data==>", result);
      if (result.Response.status === 1) {
        this.plandata = result.Response.payment_plan;
        this.separatePaymentPlans();
      } else {
        this.commonservice.presentToast("Oops", result.Response.message);
      }
    }, (err) => {
      console.log("Connection failed Message");
    });
  }

  separatePaymentPlans() {
    this.paidEventData = [];
    this.paidCommunityData = [];

    for (let paymentPlan of this.plandata) {
      if (paymentPlan["payment_for"] === "paid event") {
        this.paidEventData.push(paymentPlan);
      } else if (paymentPlan["payment_for"] === "paid community") {
        this.paidCommunityData.push(paymentPlan);
      }
    }
  }

  payNow() {
    if (this.selectedAmount > 0) {
      const UserCheckout = {
        "contact_person": this.user_data['user_name'],
        "contact_number": this.user_data['mobile'],
        "user_token": this.dataservice.getUserData(),
        "rp_payment_id": "",
        "retry_payment": 0,
        "method": 'Online',
        "amount": this.selectedAmount,
        "products": this.dataservice.GetAccountuser(),
        "plan_info": JSON.stringify(this.detailsPlan),
        "type": 'business_account',
        "reason": this.accountData.type === 1 ? 'events' : 'community',
        "duration": "",
        "start_date": "",
        "end_date": "",
      }

      const options = {
        currency: this.currency,
        key: this.razor_key,
        amount: (this.selectedAmount * 100).toString(),
        name: 'SoEasy',
        description: 'Genesis',
        image: 'https://soeasyapp.com/dashboard/img/soeasy.png',
        prefill: {
          email: this.user_data['email'],
          contact: this.user_data['mobile'],
        },
        theme: {
          color: '#3399cc'
        }
      };

      try {
        Checkout.open(options).then((response: any) => {
          UserCheckout['rp_payment_id'] = response.response['razorpay_payment_id'];
          this.chatconnect.postData(UserCheckout, "checkout").then((result: any) => {
            console.log(result);
            if (result.Response.status === 1) {
              if (this.accountData.type == 1) {
                this.router.navigate(['/buztabs/map']);
              } else if (this.accountData.type == 2) {
                this.router.navigate(['/buztabs/dashboard']);
              }
            } else {
              this.commonservice.presentToast("Oops", result.Response.message);
            }
          }, (err) => {
            console.log("Connection failed Message");
          });
        });
      } catch (error: any) {
        if (typeof error === 'string') {
          let errorObj = JSON.parse(error);
          this.commonservice.show(errorObj.description);
        } else {
          console.error('Unhandled error:', error);
        }
      }
    } else {
      this.commonservice.presentToast("", "Please Select Plan.");
    }
  }
}
