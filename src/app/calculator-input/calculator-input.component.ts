import { Component } from '@angular/core';
import { SubnetMask } from 'src/lib/calcsubnet';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.scss'],
})
export class CalculatorInputComponent {
  readonly maxPrefixLength = 30;
  readonly minPrefixLength = 8;
  readonly subnetMasks: SubnetMask[];
  selectedPrefixLength = 25;

  constructor() {
    this.subnetMasks = SubnetMask.allValidMasks.slice(
      SubnetMask.maxPrefixLength - this.maxPrefixLength,
      SubnetMask.maxPrefixLength - this.minPrefixLength + 1
    );

    //console.log(this.subnetMasks);
  }
}
