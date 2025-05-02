import { Component, inject } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  MatCalendar,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { TermDetailStore } from '../../store/term-detail.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Slot } from '../../service/calendar.service';

@Component({
  selector: 'app-pick-date',
  imports: [
    CommonModule,
    MatTimepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCalendar,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './pick-date.component.html',
  styleUrl: './pick-date.component.css'
})
export class PickDateComponent {
 store = inject(TermDetailStore);
 selectedDate: Date | null = new Date();
 daySlots: { id: string; time: string; }[] = [];
 timeSlot: Slot | null = null;

 constructor(
   private route: Router
 ) {
   this.store.loadAvailableSlots();
 }
  onDateSelected(date: Date | null ): void {
    if (!date) return;
    this.selectedDate = date;
    this.slotsForSelectedDate(date);
  }

  isSelectedDate(): boolean {
    return !!this.selectedDate;
  }

  slotsForSelectedDate(selectedDate: Date): void {
    if (!selectedDate) return;
    this.daySlots = this.store.availableSlots()[this.formatDate(selectedDate)] ?? [];
  }

  highlightDates: (date: Date) => MatCalendarCellCssClasses = (date: Date): MatCalendarCellCssClasses => {
    const dateKeys: string [] = Object.keys(this.store.availableSlots());
    return dateKeys.includes(this.formatDate(date)) ? 'highlight-available' : ''
  }

  nexStep(slot: Slot | null, date: any): void {
   if (!slot) return;
   this.store.updateSelectedTerm({ id: slot.id, term: slot.time, date: date});
   this.store.updateStep(2);
   this.route.navigate(['/personal-data']);
  }

  private formatDate(date: Date): string {
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const day: string = date.getDate().toString().padStart(2, '0');
    const year: string = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}
