import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { DatePipe } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		component: DashboardPage,
	},
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
	],
	providers: [DatePipe],
	declarations: [DashboardPage],
})
export class DashboardPageModule {}
