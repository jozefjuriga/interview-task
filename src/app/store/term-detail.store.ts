import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { firstValueFrom } from 'rxjs';

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  birthNumber: string;
  country: string;
  city: string;
}

interface SelectedDate {
  date: string;
  term: string;
  id: string;
}

type FormDataSaveStatus = 'none' | 'saving' | 'success' | 'error';

type TermDetailState = {
  currentStep: number;
  formData: FormDataState;
  selectedTerm: SelectedDate;
  loading: boolean;
  savingStatus: FormDataSaveStatus;
  saveError: string;
  availableSlots: Record<string, { id: string; time: string; }[]>;
}



const initialState: TermDetailState = {
  currentStep: 1,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    birthNumber: '',
    country: '',
    city: ''
  },
  selectedTerm: { date: '', term: '', id: '' },
  loading: false,
  savingStatus: 'none',
  saveError: '',
  availableSlots: {}
};

export const TermDetailStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),

  withMethods((store, calendarService = inject(CalendarService)) => ({
    nextStep(): void {
      patchState(store, { currentStep: store.currentStep() + 1 });
    },

    async loadAvailableSlots(): Promise<void> {
      patchState(store, { loading: true });
      try {
        const response = await firstValueFrom(calendarService.getAvailableSlots());
        patchState(store, { availableSlots: response.slots , loading: false });
      } catch (error: any) {
        console.error('Chyba pri načítavaní termínov:', error);
        patchState(store, { loading: false, availableSlots: {}});
      }
    },
    async updateFormData(data: Partial<FormDataState>): Promise<void> {
      patchState(store, {
        formData: {
          ...store.formData(),
          ...data
        }
      });
      patchState(store, { savingStatus: 'saving', saveError: '' });
      try {
        await firstValueFrom(calendarService.sendPersonalData(data));
        patchState(store, { savingStatus: 'success' });
      } catch (error: any) {
        patchState(store, { savingStatus: 'error', saveError: error.error.message });
      }
    },

    updateSelectedTerm(term: SelectedDate): void {
      patchState(store, { selectedTerm: term });
    },

    updateStep(currentStep: number): void {
      patchState(store, { currentStep });
    },

    resetStore(): void {
      patchState(store, initialState);
    }
  }))
);