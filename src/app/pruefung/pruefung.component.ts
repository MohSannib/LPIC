import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pruefung',
  templateUrl: './pruefung.component.html',
  styleUrls: ['./pruefung.component.css']
})
export class PruefungComponent {
  firstDropdownValue: any;
 

  constructor(private router: Router) { }

  navigateToPage(){
    const route = `/${this.firstDropdownValue}`;
    this.router.navigate([route]);

  }

}
