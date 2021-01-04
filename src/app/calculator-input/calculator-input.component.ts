import { AfterContentInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubnetMask } from 'src/lib/calcsubnet';
import { CustomValidators } from '../common/custom.validators';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.scss'],
})
export class CalculatorInputComponent implements AfterContentInit {
  readonly maxPrefixLength = 30;
  readonly minPrefixLength = 8;
  readonly subnetMasks: SubnetMask[];

  readonly ipAddressControl = new FormControl(null, CustomValidators.ipAddress);
  readonly prefixLengthControl = new FormControl();
  readonly subnetMaskControl = new FormControl();
  readonly usableHostsControl = new FormControl();

  readonly formGroup = new FormGroup({
    ipAddressControl: this.ipAddressControl,
    prefixLengthControl: this.prefixLengthControl,
    subnetMaskControl: this.subnetMaskControl,
    usableHostsControl: this.usableHostsControl,
  });

  private readonly defaultPrefixLength = 24;
  private readonly setValueOptions = { emitEvent: false };

  constructor() {
    this.subnetMasks = SubnetMask.allValidMasks.slice(
      SubnetMask.maxPrefixLength - this.maxPrefixLength,
      SubnetMask.maxPrefixLength - this.minPrefixLength + 1
    );
  }

  onChangePrefixLength(): void {
    const value = this.prefixLengthControl.value;
    this.subnetMaskControl.setValue(value, this.setValueOptions);
    this.usableHostsControl.setValue(value, this.setValueOptions);
  }

  onChangeSubnetMask(): void {
    const value = this.subnetMaskControl.value;
    this.prefixLengthControl.setValue(value, this.setValueOptions);
    this.usableHostsControl.setValue(value, this.setValueOptions);
  }

  onChangeUsableHosts(): void {
    const value = this.usableHostsControl.value;
    this.prefixLengthControl.setValue(value, this.setValueOptions);
    this.subnetMaskControl.setValue(value, this.setValueOptions);
  }

  ngAfterContentInit(): void {
    this.prefixLengthControl.setValue(this.defaultPrefixLength);
    this.onChangePrefixLength();
  }
}
