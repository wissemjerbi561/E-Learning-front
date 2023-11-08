import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-learning-front';
   user = localStorage.getItem('user');
  showHeader = true;
  showFooter = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login' || val.url == '/register') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login' || val.url == '/register') {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
      }
    });
  }
}
