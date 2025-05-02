import { Component, effect, inject, OnInit } from '@angular/core';
import { TermDetailStore } from '../../store/term-detail.store';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { allSlovakCities } from '../../utils/constans';
import { DatePipe, NgIf } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-summary',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    DatePipe,
    MatCheckbox,
    NgIf
  ],
  templateUrl: './reservation-summary.component.html',
  styleUrl: './reservation-summary.component.css'
})
export class ReservationSummaryComponent implements OnInit{
  store = inject(TermDetailStore);
  checkboxForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {
    effect(() => {
      const status = this.store.completeStatus();
      // const error = this.store.saveError(); // error.message

      if (status === 'success') {
        this.store.updateStep(4);
        this.route.navigate(['/thank-you']);

      } else if (status === 'error') {
        this.store.updateStep(4);
        this.route.navigate(['/error']);
      }
    });
  }
  ngOnInit(): void {
    this.checkboxForm = this.fb.group({
      personal: [false, Validators.requiredTrue],
      terms: [false, Validators.requiredTrue],
      marketing: [false]
    });
  }

  get personal() {
    return this.checkboxForm.get('personal');
  }

  get terms() {
    return this.checkboxForm.get('terms');
  }

  onSubmit(): void {
    if (!this.checkboxForm.valid) return;
    this.store.updateStep(4);
    this.store.completeRezervation(this.store.selectedTerm.id());
  }
}
