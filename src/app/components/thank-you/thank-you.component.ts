import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  @Input() name: string = 'ADAM';

  close(): void {
   window.location.href = 'https://nemocnicabory.sk';
  }
}
