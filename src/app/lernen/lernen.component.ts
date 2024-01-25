// lernen.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.css']
})
export class LernenComponent {
  firstDropdownValue: any;
  secondDropdownValue: any;

  constructor(private router: Router) { }

  navigateToPage(){
    const route = `/${this.secondDropdownValue}`;
    this.router.navigate([route]);

  }
}