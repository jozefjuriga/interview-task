import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TermDetailStore } from '../store/term-detail.store';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {
  store = inject(TermDetailStore);
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredStep = route.data['step'] as number;
    if (requiredStep === 1) {
      return true;
    }
    const currentStep = this.store.currentStep();

    return currentStep === requiredStep ? true : this.router.createUrlTree(['/']);

  }
}