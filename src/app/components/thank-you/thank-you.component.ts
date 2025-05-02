import { Component, inject, Input } from '@angular/core';
import { TermDetailStore } from '../../store/term-detail.store';

@Component({
  selector: 'app-thank-you',
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  store = inject(TermDetailStore);

  close(): void {
   window.location.href = 'https://nemocnicabory.sk';
  }
}
