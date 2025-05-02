import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { adultBirthNumberValidator } from '../../utils/validators';
import { allSlovakCities } from '../../utils/constans';
import { TermDetailStore } from '../../store/term-detail.store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-data',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule
  ],
  templateUrl: './person-data.component.html',
  styleUrls: ['./person-data.component.css']
})
export class PersonDataComponent implements OnInit, OnDestroy {
  store = inject(TermDetailStore);
  personalForm!: FormGroup;
  private countryChangeSubscription!: Subscription;
  private snackBar = inject(MatSnackBar);
  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {
    effect(() => {
      const status = this.store.savingStatus();
      // const error = this.store.saveError(); // error.message

      if (status === 'success') {
        this.snackBar.open('Údaje úspešne uložené!', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.store.updateStep(3);
        this.route.navigate(['/reservation-details']);

      } else if (status === 'error') {
        this.snackBar.open('Nepodarilo sa uložiť údaje. Skúste to znova.','', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  ngOnInit(): void {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthNumber: ['', [Validators.required, adultBirthNumberValidator()]],
      country: ['', Validators.required],
      city: [{ value: '', disabled: true}],
      email: ['', [Validators.required, Validators.email]]
    });

    const countryControl = this.personalForm.get('country');
    const cityControl = this.personalForm.get('city');

    if (countryControl && cityControl) {
      this.countryChangeSubscription = countryControl.valueChanges.pipe(
        startWith(countryControl.value)
      ).subscribe(country => {
        if (country === 'SVK') {
          cityControl.enable();
          cityControl.setValidators([Validators.required]);
        } else {
          cityControl.disable();
          cityControl.setValue('');
          cityControl.clearValidators();
          cityControl.setErrors(null);
        }

        cityControl.updateValueAndValidity({ emitEvent: false });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.countryChangeSubscription) {
      this.countryChangeSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (!this.personalForm.valid) return;
    this.store.updateFormData(this.personalForm.value);
  }

   isSlovakCountrySelected(): boolean {
    return this.personalForm.get('country')?.value === 'SVK';
  }

  protected readonly allSlovakCities = allSlovakCities;
}
