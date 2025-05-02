import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function adultBirthNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthNumber: string | null = control.value;

    if (!birthNumber) {
      return null;
    }

    const formatMatch = birthNumber.match(/^(\d{6})\/?(\d{3,4})$/);
    if (!formatMatch) {
      return { invalidBirthNumber: { message: 'Zly format r.č' } };
    }

    const year = parseInt(formatMatch[1].substring(0, 2), 10);

    const month = parseInt(formatMatch[1].substring(2, 4), 10);
    const day = parseInt(formatMatch[1].substring(4, 6), 10);
    const suffix = formatMatch[2];
    const beforeMillennium = (suffix.length === 3 && year < 54) || year >= 54;
    const fullYear = beforeMillennium ? 1900 + year  : 2000 + year;

     if (month < 1 || month > 12) {
      return { invalidBirthNumber: { message: 'ZLý mesiac' } };
    }

    if (day < 1 || day > 31 || (month === 2 && day > 29) || ([4, 6, 9, 11].includes(month) && day > 30)) {
      return { invalidBirthNumber: { message: 'ZLý deň' } };
    }

    const today = new Date();
    const date18YearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const birthDate = new Date(fullYear, month - 1, day);

    if (birthDate > date18YearsAgo) {
      return { adult: { message: 'Ľutujeme, nemožete pokračovať, nieste plnoletý' } };
    }

    return null;
  };
}