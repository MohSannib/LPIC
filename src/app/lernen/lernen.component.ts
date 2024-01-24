// lernen.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.css']
})
export class LernenComponent {
  selectedOption1: string = '';
  selectedOption2: string = '';

  options1: string[] = ['LPIC-1 101', 'LPIC-1 102'];
  options2: string[] = ['single-choice', 'multiple-choice', 'fillin'];

  constructor(private router: Router) {}

  redirectToPage() {
    // Redirect based on user's choices
    let redirectTo = '';

    if (this.selectedOption1 === 'LPIC-1 101' && this.selectedOption2 === 'single-choice') {
      redirectTo = '/single-choice';
    } else if (this.selectedOption1 === 'LPIC-1 101' && this.selectedOption2 === 'multiple-choice') {
      redirectTo = '/multiple-choice';
    } else if (this.selectedOption1 === 'LPIC-1 101' && this.selectedOption2 === 'fillin') {
      redirectTo = '/fillin';
    }
    // Add more conditions as needed

    // Redirect to the determined page
    if (redirectTo !== '') {
      this.router.navigateByUrl(redirectTo);
    }
  }
}
