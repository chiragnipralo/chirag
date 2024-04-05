import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-buztabs',
  templateUrl: './buztabs.page.html',
  styleUrls: ['./buztabs.page.scss'],
})
export class BuztabsPage implements OnInit {
  @ViewChild('tabs', { static: false })
  tabs!: IonTabs;
  selectedTab: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab);
  }
  
  CreateEvent(){
		this.router.navigate(['./create-event'])
	}
}
