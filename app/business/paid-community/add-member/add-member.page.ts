import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";  
import { NavController,LoadingController,AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DatePipe, Location } from '@angular/common';
import { AnyRecord } from 'dns';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
  
export class AddMemberPage implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;
  isEditingExistingMember = false;
  selectedMember: any;

  public communityId: number | undefined;
  searchTerm:any;
  user_lists = [];
  ev_managers:any={};
  showSearch = false;
  showFormm = false;

  constructor(public formBuilder: FormBuilder,
		public common:CommonService,
		public dataservice: DataService,
		public chatconnect: HttpService,
		public router: Router, public navCtrl: NavController,
		public loadingController: LoadingController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private location: Location) {
    
    this.route.queryParams.subscribe(params => {
      this.communityId = +params['value1'];
    });

   }

  ngOnInit() {
    console.log("Coomunity_id ==>", this.communityId)
    if (this.showFormm = true) {
      this.ionicForm = this.formBuilder.group({
        full_name: [null, [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        contact: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
        gender: [''],
        dob: [''],
        marital_status: [''],
        qualification: [''],
        address: [''],
        pincode: ['']
      })
    }
  }

  testFunc(ev:any) {
    if (ev.detail.value.length > 3) {
      let apidata = {
        user_token: this.dataservice.getUserData(),
        search_params: ev.detail.value,
        community_id:this.communityId
      };
      this.chatconnect.postData(apidata, "get_all_users_for_community").then(
        (result: any) => {
          console.log(result);
          if (result.Response.status == 1) {
            this.user_lists = result.Response.all_users;
          } else {
            this.common.presentToast("Oops", result.Response.message);
          }
        },
        (err) => {
          console.log("Connection failed Messge");
        }
      );
      this.showSearch = true;
    } else {
      this.showSearch = false;
    }
  }
  
  SetValue(params:any) {
    console.log("This is User Selected User Details ==> ", params);
    if (this.showFormm) {
      this.searchTerm = '';
    }
    this.searchTerm=params.user_name
    this.showFormm = false;
    this.user_lists = [];
  }

  selectExistingMember(member:any) {
    this.isEditingExistingMember = true;
    this.selectedMember = member;
    this.populateFormWithMemberData();
    //this.showForm();
  }
  
  populateFormWithMemberData() {
    this.ionicForm.patchValue({
      full_name: this.selectedMember.user_name,
      email: this.selectedMember.email,
      contact: this.selectedMember.mobile,
      gender: this.selectedMember.gender,
      dob: this.selectedMember.dob,
      marital_status: this.selectedMember.marital_status,
      qualification: this.selectedMember.qualification,
      address: this.selectedMember.address,
      pincode: this.selectedMember.pincode,
    });
  }

  showForm() {
    console.log("Click on show Form!!")
    this.searchTerm = '';
    this.user_lists = [];
    this.showSearch = false;
    this.showFormm = true;
    this.isEditingExistingMember = false;
    this.ionicForm.reset();
  }

  async submit(){
		this.isSubmitted = true;
		this.ionicForm.markAllAsTouched(); 
    console.log(this.ionicForm)
    
		if (!this.ionicForm.valid){
			let alert = await this.alertController.create({
        header: 'Please Enter',
        subHeader: 'Please Enter all details',
        buttons: ['Dismiss']
			});
			alert.present();
		} else {
      this.common.show("Please Wait");
      // let apidata = {
      //   user_token: this.dataservice.getUserData(),
      //   community_id: this.communityId,
      //   ...(this.isEditingExistingMember
      //     ? { member_id: this.selectedMember.id } 
      //     : {
      //         full_name: this.ionicForm.value.full_name,
      //         email: this.ionicForm.value.email,
      //         contact: this.ionicForm.value.contact,
      //         gender: this.ionicForm.value.gender,
      //         dob: this.ionicForm.value.dob,
      //         marital_status: this.ionicForm.value.marital_status,
      //         qualification: this.ionicForm.value.qualification,
      //         address: this.ionicForm.value.address,
      //         pincode: this.ionicForm.value.pincode,
      //     }),
      // };
      let apidata = {
        user_token: this.dataservice.getUserData(),
        community_id: this.communityId,
        member_id: this.selectedMember.id,
        full_name: this.ionicForm.value.full_name,
        email: this.ionicForm.value.email,
        contact: this.ionicForm.value.contact,
        gender: this.ionicForm.value.gender,
        dob: this.ionicForm.value.dob,
        marital_status: this.ionicForm.value.marital_status,
        qualification: this.ionicForm.value.qualification,
        address: this.ionicForm.value.address,
        pincode: this.ionicForm.value.pincode,
        sender_role:"superadmin"
      };
      
      console.log("This is API Data==> ",apidata)
      console.log("This Is data==>",this.ionicForm.value)
      this.chatconnect.postData(apidata,"add_member").then((result:any)=>{
      console.log(result);
      this.common.hide();
        if (result.Response.status == 1) {
          this.location.back();
          this.common.presentToast("", result.Response.message) 
        }else{
          this.common.presentToast("",result.Response.message)
        }
      },(err)=>{
        this.common.hide();
        console.log("Connection failed Messge");
      });
      }
    }
}