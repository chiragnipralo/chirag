import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  user_loginstate:any

  constructor(public dataservice: DataService,private authService: AuthenticationService, private router: Router,public modalController: ModalController) {}

  canLoad(): Observable<boolean> {
    this.user_loginstate=this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated){
          console.log(isAuthenticated)
          return true;
        } else {
          this.router.navigateByUrl('/welcome');
          return false;
        }
      })
      );
    return this.user_loginstate;
  }
}