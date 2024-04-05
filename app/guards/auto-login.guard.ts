import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated): boolean => {
        if (isAuthenticated) {
          console.log(isAuthenticated);
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
          return false; // Returning false to indicate that navigation should not be allowed
        } else {
          return true; // Returning true to indicate that navigation is allowed
        }
      })
    );
  }
}
