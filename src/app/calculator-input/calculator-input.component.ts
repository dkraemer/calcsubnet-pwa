import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IpAddress, SubnetInfo, SubnetMask } from 'src/lib/calcsubnet';
import { CustomValidators } from '../common/custom.validators';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  //styleUrls: ['./calculator-input.component.scss'],
})
export class CalculatorInputComponent implements AfterContentInit, OnChanges {
  @Input() disabled = false;
  @Output() subnetInfoChange = new EventEmitter<SubnetInfo>();

  readonly maxPrefixLength = 30;
  readonly minPrefixLength = 16;
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

  private readonly defaultSubnetMask = SubnetMask.fromString('255.255.255.0');
  private readonly setValueOptions = { emitEvent: false };

  constructor() {
    this.subnetMasks = SubnetMask.allValidMasks.slice(
      SubnetMask.maxPrefixLength - this.maxPrefixLength,
      SubnetMask.maxPrefixLength - this.minPrefixLength + 1
    );
  }

  emitSubnetInfo(): void {
    if (this.ipAddressControl.valid) {
      this.subnetInfoChange.emit(
        new SubnetInfo(
          // * Cast is safe: If the address is valid, it cannot be undefined.
          IpAddress.fromString(this.ipAddressControl.value) as IpAddress,
          SubnetMask.fromString(this.prefixLengthControl.value) as SubnetMask
        )
      );
    }
  }

  onChangeIpAddress(): void {
    this.emitSubnetInfo();
  }

  onChangePrefixLength(): void {
    const value = this.prefixLengthControl.value;
    this.subnetMaskControl.setValue(value, this.setValueOptions);
    this.usableHostsControl.setValue(value, this.setValueOptions);
    this.emitSubnetInfo();
  }

  onChangeSubnetMask(): void {
    const value = this.subnetMaskControl.value;
    this.prefixLengthControl.setValue(value, this.setValueOptions);
    this.usableHostsControl.setValue(value, this.setValueOptions);
    this.emitSubnetInfo();
  }

  onChangeUsableHosts(): void {
    const value = this.usableHostsControl.value;
    this.prefixLengthControl.setValue(value, this.setValueOptions);
    this.subnetMaskControl.setValue(value, this.setValueOptions);
    this.emitSubnetInfo();
  }

  ngAfterContentInit(): void {
    this.prefixLengthControl.setValue(this.defaultSubnetMask);
    this.onChangePrefixLength();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }
}
