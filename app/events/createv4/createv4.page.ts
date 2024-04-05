import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormArray,FormBuilder, Validators } from "@angular/forms";
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-createv4',
  templateUrl: './createv4.page.html',
  styleUrls: ['./createv4.page.scss'],
})
export class Createv4Page implements OnInit {

  paidEventBar: boolean | undefined;
  moreBar: any;
  ionicForm: FormGroup | undefined;
  is_allow_sharing: any;
  event_value: any;
  is_notify_participants: any;
  is_freeevent: boolean = false;
  isToggled: boolean = false;

  constructor(public navCtrl: NavController, 
    public router: Router,
    public commonservice:CommonService,
    public modalController: ModalController,
    public dataservice: DataService){
  }

  notify() {
    console.log("CHANGED ")
    // this.is_freeevent = ! this.is_freeevent;
    this.paidEventBar = ! this.paidEventBar;
    if (this.paidEventBar){
      // use setTimeout to allow *ngIf to display searchBar before calling setFocus
      setTimeout( () => {
        if (this.moreBar) this.moreBar.setFocus();
      } )
    }else{
      this.event_value=undefined;
    }
    console.log("CHANGED ",this.paidEventBar)
  }

  GoNext(){
    console.log(typeof this.is_freeevent)
    console.log(this.is_freeevent)
    console.log(this.is_allow_sharing)
    console.log(this.event_value)
    console.log(this.isToggled)

    console.log(this.event_value)
    if(this.is_freeevent){
      if(this.event_value){
        this.event_value=this.event_value.trim();
      }
      
      if(!this.event_value){
        this.commonservice.presentToast("Oops","Please Enter the amount");
        return false;
      }
    }

    console.log(this.is_notify_participants)
    let permissions={
      is_freeevent:this.event_value ? false:true,
      is_allow_sharing:this.is_allow_sharing ? this.is_allow_sharing : false,
      event_value:this.event_value ? this.event_value : '',
      is_notify_participants:this.is_notify_participants ? this.is_notify_participants: false
    }
    console.log(permissions);
    this.dataservice.events_form.push({event_permission:permissions});

    this.closeModal()
    // this.router.navigate(['/contact']);
  }


  async closeModal(){
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }



  ngOnInit() {
  }



}
