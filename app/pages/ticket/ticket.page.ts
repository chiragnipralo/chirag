import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-ticket',
	templateUrl: './ticket.page.html',
	styleUrls: ['./ticket.page.scss'],
})

export class TicketPage implements OnInit {
	ticket_data = [];
	ticketType: any;
	constructor(
		private alertController: AlertController,
		public commonservice: CommonService,
		public dataservice: DataService,
		public modalController: ModalController,
		private _route: ActivatedRoute,
		private location: Location,
		public mapmodal: ModalController,
		public chatconnect: HttpService,
		private _router: Router
	) { }

	ngOnInit() {
	}

	getRange(count: number): number[] {
		return Array(count).fill(0).map((x, i) => i + 1);
	}

	ionViewDidEnter() {
		this.ticketType = this._route.snapshot.params['business'];
		console.log("TIcket",this.ticketType);
		this.show_ticket();
	}

	show_ticket() {
		this.commonservice.show();
		let apidata = {
			user_token: this.dataservice.getUserData(),
			event_id: this._route.snapshot.params['event_id'],
			type: this._route.snapshot.params['business']
		}
		console.log("This is API Data ==>", apidata)
		this.chatconnect.postData(apidata, "show_ticket").then((result: any) => {
			this.commonservice.hide();
			console.log(result);
			if (result.Response.status == 1) {
				this.ticket_data = result.Response.show_ticket;
			} else {
				this.commonservice.presentToast("Oops", result.Response.message)
			}
		}, (err) => {
			console.log("Connection failed Message");
		});
	}

	async deleteTicket(params: any) {
		const alert = await this.alertController.create({
			header: 'Confirm',
			message: 'Are you sure you want to delete this ticket?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'Yes',
					handler: () => {
						let apidata = {
							user_token: this.dataservice.getUserData(),
							event_id: this._route.snapshot.params['event_id'],
							token: params.token,
							type: this._route.snapshot.params['business'],
						}
						this.chatconnect.postData(apidata, "cancel_ticket").then((result: any) => {
							if (result.Response.status == 1) {
								this.location.back();
								this.commonservice.presentToast("", result.Response.message)
							} else {
								this.commonservice.presentToast("Oops", result.Response.message)
							}
						}, (err) => {
							console.log("Connection failed Messge");
						});
					}
				},
			],
		});
		await alert.present();
	}
}
