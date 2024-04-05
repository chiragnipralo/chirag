import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-perm',
  templateUrl: './create-perm.page.html',
  styleUrls: ['./create-perm.page.scss'],
})
export class CreatePermPage implements OnInit {

constructor(
  public modalController: ModalController,
  public router: Router,
  public dataservice: DataService,

    ) { }

  ngOnInit() {
  }

	async closeModal() {
	  await this.modalController.dismiss({
	    'dismissed': true
    });
    if (this.dataservice.community_event_or_not == "community") {
      this.router.navigate(['/buztabs/dashboard']);
    } else {
      this.router.navigate(['/buztabs/map']);
    }
	}

}
