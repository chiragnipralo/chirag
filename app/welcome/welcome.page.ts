import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { INTRO_KEY } from '../guards/intro.guard';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('slides')
  slides!: IonSlides;
  navCtrl: any;
  currentIndex = 0;
  totalSlide = 3;
  
  constructor(public dataservice: DataService,
    private router: Router,
    private platform: Platform) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/welcome') {
        this.navCtrl.navigateRoot('/welcome');
      } else {
        this.navCtrl.back();
      }
      if (this.platform.is('android') && this.platform.is('cordova')) {
        if (window.location.pathname === '/welcome') {
          (navigator as any)['app'].exitApp();
        }
      }
    });
  }  
  
  swipeNext(){
    this.currentIndex++;
    this.slides.slideTo(this.currentIndex)
  }

  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.currentIndex = index;
    });
  }


  async start() {
    await this.dataservice.setItem(INTRO_KEY,'true');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  ngOnInit() {
  }
}
