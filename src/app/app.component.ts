import { Component } from '@angular/core';
import { Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LPIC';
  
  constructor(private router: Router){}

  isStartseite(){
    return this.router.url === '/';
  }
}

