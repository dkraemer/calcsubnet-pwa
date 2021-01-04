import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubnetMask } from 'src/lib/calcsubnet';
import { CustomValidators } from '../common/custom.validators';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.scss'],
})
export class CalculatorInputComponent {
  readonly maxPrefixLength = 30;
  readonly minPrefixLength = 8;
  readonly subnetMasks: SubnetMask[];
  readonly ipAddressControl = new FormControl(null, CustomValidators.ipAddress);
  readonly formGroup = new FormGroup({
    ipAddressControl: this.ipAddressControl,
  });
  selectedPrefixLength = 24;

  constructor() {
    this.subnetMasks = SubnetMask.allValidMasks.slice(
      SubnetMask.maxPrefixLength - this.maxPrefixLength,
      SubnetMask.maxPrefixLength - this.minPrefixLength + 1
    );
  }
}
