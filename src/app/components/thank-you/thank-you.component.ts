import { Component, inject } from '@angular/core';
import { TermDetailStore } from '../../store/term-detail.store';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  store = inject(TermDetailStore);

  close(): void {
   window.location.href = 'https://nemocnicabory.sk';
  }
}
