import { AbstractControl, ValidationErrors } from '@angular/forms';
import { IpAddress } from 'src/lib/calcsubnet';

export class CustomValidators {
  static ipAddress(control: AbstractControl): ValidationErrors | null {
    return IpAddress.fromString(control.value) === undefined
      ? { invalidIPAddress: true }
      : null;
  }
}
