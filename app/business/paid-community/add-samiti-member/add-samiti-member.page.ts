import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-samiti-member',
  templateUrl: './add-samiti-member.page.html',
  styleUrls: ['./add-samiti-member.page.scss'],
})
  
export class AddSamitiMemberPage implements OnInit {
  communityData: any;
  member: any;
  showSearchBar = false;
  searchQuery = '';
  filterData:any = [];
  selectedMembers: { user_id: number, role: string }[] = [];

  @ViewChild('searchBar', { read: ElementRef }) searchBarRef!: ElementRef<IonSearchbar>;

  toggleSearchBar() {
		this.showSearchBar = !this.showSearchBar;
		if (this.showSearchBar) {
			setTimeout(() => {
				const searchBar = this.searchBarRef.nativeElement;
				searchBar.setFocus();
			}, 100);
		} else {
			this.searchQuery = '';
		}
	}
 
  filterItems(event:any){
    console.log(event.detail.value)
    if(!this.dataservice.isNullOrUndefined(event.detail.value)){
      this.filterData = this.member.filter((data:any) => {
        return (data.full_name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    }
  }
 
  doRefresh(refresher: { target: { complete: () => void; }; }) {
    this.GetCommunityMember();
    setTimeout(() => {
      refresher.target.complete();
    }, 2000);
  }

  constructor(
    public commonservice:CommonService,
    public dataservice: DataService,
    public chatconnect: HttpService,
    private _route: ActivatedRoute,
    private location: Location,
    private router:Router
  ) { }
  
  checkboxClick(ui: { user_id: number, checked: boolean, role: string }) {
    console.log(ui);
  }  

  ngOnInit() {
    console.log("SamitiID=>",this._route.snapshot.params['samiti_id'])
    // this.GetCommunityMember();
  }

  ionViewDidEnter() {
    console.log('page enter');
    this.GetCommunityMember();
  }

  GetCommunityMember() {
    const id = this.dataservice.GetAccountuser();
    let apidata={
      user_token: this.dataservice.getUserData(),
      community_id: id,
      samiti_id:this._route.snapshot.params['samiti_id']
    }
 
    this.chatconnect.postData(apidata,"samiti_member_list").then((result:any)=>{
      console.log(result);
      if(result.Response.status ==1){
        this.member = result.Response.members;
        this.filterData = this.member
        console.log("This is Member Details:",this.filterData)
      }else{
        this.commonservice.presentToast("Oops",result.Response.message)
      }
    },(err)=>{
      console.log("Connection failed Messge");
    });    
  }

  add_member() {
    const selectedUsers = this.filterData.filter((ui: { checked: any; }) => ui.checked);
    const selectedMembers = selectedUsers.map((ui: { user_id: any; role: any; }) => ({ user_id: ui.user_id, role: ui.role }));
    console.log(selectedMembers);

    if (selectedMembers.length === 0) {
      this.commonservice.presentToast("Oops","Please Select Member...")
    } else {
      this.commonservice.show("Please Wait");
      const userToken = this.dataservice.getUserData();
      var formData = new FormData();
      if (userToken !== null) {
        formData.append('user_token', userToken);
      }
      formData.append('samiti_id', this._route.snapshot.params['samiti_id']);
      formData.append('members', JSON.stringify(selectedMembers));
      this.chatconnect.postFormData(formData, "add_samiti_member").then((result: any) => {
        this.commonservice.hide();
        if (result.Response.status == 1) {
          this.commonservice.presentToast("", result.Response.message)
          this.router.navigate(['/samiti-details',{samiti_id:this._route.snapshot.params['samiti_id']}]);
        } else {
          this.commonservice.presentToast("Oops", result.Response.message)
        }
      }, (err) => {
        this.commonservice.hide();
        console.log("Connection failed Messge");
      });
    }
  }
}