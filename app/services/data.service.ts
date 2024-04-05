import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';
 
 
@Injectable({
  providedIn: 'root'
})
  
export class DataService {
  private storageKey = 'activityData';
  initialHref = window.location.href;
  
  show_branch_view = new BehaviorSubject<any>(false);
  
  all_contacts: any[] = [];
  shareable_event_url:any;
  is_user_login_or_signup: any;
  community_id: any;
  event_food_type: any;
  event_cusine_type: any;
  eventFlag: any;
  previous_img: any;
  communityId: any;
  public_event: any;
  locationn: any;
  community_type: any;
  is_premium: any;
  user_req_token:any;
  user_fcmpush_token: any;
  tokenUrl: any;
  staff_data:any={};
  appHashString: any;
  termsCondition: any;
  inviteCharge: any;
  // user_event_data:any;
  user_event_data: any = {};
  user_community_data: any = {};
  user_event_chat_data:any={};
  insight_data:any;
  ticket_data:any;
  event_base64img:any;
  user_profile_data:any={};
  emergency_contact:any=[];
  events_form:any=[];
  events_categories:any=[];
  age_groups: any = [];
  foodImages: any = [];
  events_languages:any=[];
  events_fooditems: any = [];
  cusines_items: any = [];
  events_custom_fooditems:any=[];
  events_manager:any=[];
  events_guests: any = [];
  TicketList: any = [];
  events_activities:any=[];
  home_slider:any=[];
  user_account_data:any;
  set_user_signup: any = {};
  community_member: any = [];
  community_event_or_not: any = [];
  otp:any;
  orginalImage: any;
  prev_orginalImage: any;
  totalContactCount!: number;
  event_id: any;
  favourites=[{id:1,name:'Religion',checked:false},{id:2,name:'Sports',checked:false},{id:3,name:'Children',checked:false},{id:4,name:'Pets',checked:false},{id:5,name:'Study',checked:false},{id:6,name:'Art',checked:false},{id:7,name:'Movies',checked:false},{id:8,name:'Restaurant',checked:false},{id:9,name:'Games',checked:false}];
 
 constructor(
  private _router: Router,
  private _location: Location,
  public authservice: AuthenticationService,
  ) { }
 
 
 public setOtp(data: any) {
  this.otp = data;
}
 
public getOtp(){
  return this.otp?.toString();
}
 
getUserData(){
  return localStorage.getItem('user');
}
 
 
isNullOrUndefined(data:any){
  console.log("imcoming locaal dats-->",data);
  console.log(typeof data);
  if((data ==null && data == undefined && data == "") ||  typeof data === 'object'){
    return true;
  }else {
    return false;
  }
}
 
public ValidateArray(array: string | any[] | null){
  if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
    return true;
  }else{
    return false;
  }
}
 
public ValidateObject(obj: {}){
  if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
    return true;
  }else{
    return false;
  }
}
 
setItem(key: string, value: string) {
  return Promise.resolve().then(function () {
    localStorage.setItem(key, value);
  });
}
 
getItem(key: string) {
  return Promise.resolve().then(function () {
    return localStorage.getItem(key);
  });
}
 
 
getInitials(x: string){
  if(x){
    var seperateWords = x.split(" ");
    var acronym = "";
    for (var i = 0; i < seperateWords.length; i++){
      acronym = (acronym + seperateWords[i].substr(0,1));
    }
    return acronym;
  }
}
 
 
 
/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
public convertBase64ToBlob(base64Image: string) {
  // console.log("base64Image ---->",base64Image);
  // Split into two parts
  const parts = base64Image.split(';base64,');
 
  // Hold the content type
  const imageType = parts[0].split(':')[1];
 
  // Decode Base64 string
  const decodedData = window.atob(parts[1]);
 
  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);
 
  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
 
  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType });
}
 
 
blobToBase64(blob: Blob){
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
 
 
setUserData(useriddetails: string){
  localStorage.setItem('user',useriddetails);
}
 
setAccountuser(accountiddetails: any){
  this.user_account_data=accountiddetails;
}
 
GetAccountuser(){
  return this.user_account_data;
}
 
setEventData(evparams: any){
  this.user_event_data=evparams;
  // localStorage.setItem('user',useriddetails);
}
 
GetEventData(){
  return this.user_event_data;
}
 
setCommunityData(evparams: any){
  this.user_community_data=evparams;
  // localStorage.setItem('user',useriddetails);
}
 
GetCommunityData(){
  return this.user_community_data;
}
 
setInsightData(evparams: any){
  this.insight_data=evparams;
}
 
GetInsightData(){
  return this.insight_data;
}
 
setTicketData(evparams: any){
  this.ticket_data=evparams;
}
 
GetTicketData(){
  return this.ticket_data;
}
 
clearUserData(){
  localStorage.clear();
  this.authservice.isAuthenticated.next(false);
  this._router.navigate(['home']);
}
 
get isUserLoggedIn() {
  const data = localStorage.getItem('user');
  return data ? true : false;
}
 
  saveActivity(activity: any) {
  // Get existing activity data from localStorage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
 
    // Add the new activity to the existing data
    existingData.push(activity);
 
    // Save the updated data back to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(existingData));
  }
 
  getActivityData() {
    // Retrieve activity data from localStorage
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}