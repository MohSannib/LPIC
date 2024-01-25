import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  firstDropdownValue: any;
  secondDropdownValue: any;

  constructor(private router: Router) { }

  navigateToPage(){
    const route = `/${this.secondDropdownValue}`;
    this.router.navigate([route]);

  }

}
