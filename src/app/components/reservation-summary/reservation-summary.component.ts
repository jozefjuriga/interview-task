import { Component, inject, OnInit } from '@angular/core';
import { TermDetailStore } from '../../store/term-detail.store';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { allSlovakCities } from '../../utils/constans';
import { DatePipe, NgIf } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';

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
    private fb: FormBuilder) {
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

  get marketing() {
    return this.checkboxForm.get('marketing');
  }

  onSubmit(): void {
    if (!this.checkboxForm.valid) return;
    this.store.updateStep(4);
  }
}
