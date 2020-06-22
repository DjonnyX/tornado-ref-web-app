import { AbstractControl } from '@angular/forms';

export function equalControlsValidator(discoveredControl: AbstractControl) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== discoveredControl.value) {
        return { 'equal': true };
      }
      return null;
    }
  }
  