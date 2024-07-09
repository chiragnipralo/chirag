import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data.service';
import { Network } from '@capacitor/network';

// let apiUrl = "http://localhost/soeasyapi/";
//let apiUrl = "https://slimapi.webinovator.com/soeasyapi/";
// let apiUrl = "https://betaapi.soeasyapp.com/";

let apiUrl = "https://api.soeasyapp.com/";
let paymentUrl = "https://admin.payomatix.com/payment/merchant/";

@Injectable({ providedIn: 'root' })

export class HttpService {

  constructor(private http: HttpClient,
    public dataservice: DataService,
    public common: CommonService) {

    this.checkInternetConnection();
  }

  initiatePayment(credentials: object, type: string) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'PAY46ZGYME1AE6LUR1AVI1701862757.YFGJ11SECKEY')
    };

    return new Promise((resolve, reject) => {
      this.http.post(paymentUrl + type, JSON.stringify(credentials), header).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
        if (err.name == "HttpErrorResponse") {
          if (err.statusText == "Unknown Error") {
            this.checkInternetConnection();
          } else if (err.statusText == "OK") {
            this.common.presentToast("", "Something Went Wrong...")
          } else {
            this.common.presentToast("", err.statusText)
          }
        }
        console.log("In Chatconnect provider : Error", err);
      });
    });
  }

  postData(credentials: object, type: string) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, JSON.stringify(credentials), header).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
        if (err.name == "HttpErrorResponse") {
          if (err.statusText == "Unknown Error") {
            this.checkInternetConnection();
          } else if (err.statusText == "OK") {
            this.common.presentToast("", "Something Went Wrong...")
          } else {
            this.common.presentToast("", err.statusText)
          }
          // this.dataservice.clearUserData();
        }
        console.log("In Chatconnect provider : Error", err);
      });
    });
  }

  async checkInternetConnection() {
    const networkStatus = await Network.getStatus();

    if (networkStatus.connected) {
      console.log('Internet is connected');
      // Handle the case when the internet is connected
    } else {
      console.log('No internet connection');
      this.common.presentToast("", "Check your internet connection")
      // Handle the case when there is no internet connection
      // You can set an error message or take other actions here
    }
  }


  public postFormData(formData: FormData, url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Accept', 'application/json'); // No need to specify 'Content-Type' for FormData

      this.http.post(apiUrl + url, formData, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  //  postFormData(formData: string, type: string) {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(apiUrl+type, formData).subscribe(res => {                                          
  //       resolve(res);
  //     }, (err) =>{
  //       reject(err);
  //       console.log("In Chatconnect provider : Error");
  //     });
  //   });
  // }
}