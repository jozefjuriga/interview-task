import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { TermDetailStore } from '../../../store/term-detail.store';

@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  store = inject(TermDetailStore);
  showModal = false;
  ngOnInit(): void {
    this.store.currentStep;
  }
  onClose(): void {
    this.store.resetStore();
    location.href = '/'
    this.showModal = false;
  }

  onBack(): void {
    this.showModal = false;
  }

  onOpenModal() {
    this.showModal = true;
  }
}
