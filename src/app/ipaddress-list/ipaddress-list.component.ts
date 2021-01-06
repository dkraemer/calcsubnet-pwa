import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TrackByFunction,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IpAddress, SubnetInfo } from 'src/lib/calcsubnet';

@Component({
  selector: 'app-ipaddress-list',
  templateUrl: './ipaddress-list.component.html',
  styleUrls: ['./ipaddress-list.component.scss'],
})
export class IPAddressListComponent implements OnChanges {
  @Input() disabled = false;
  @Input() subnetInfo: SubnetInfo | undefined;
  @Input() showList = false;
  @Output() readonly dirtyList = new EventEmitter();

  rowFormArray = new FormArray([]);
  formGroup = new FormGroup({
    rowControls: this.rowFormArray,
  });

  get canShowList(): boolean | undefined {
    return (
      this.showList &&
      this.subnetInfo &&
      this.subnetInfo.subnetMask.prefixLength >= 24
    );
  }

  get isListTooBigToShow(): boolean | undefined {
    return (
      this.showList &&
      this.subnetInfo &&
      this.subnetInfo.subnetMask.prefixLength < 24
    );
  }

  trackByIpAddress: TrackByFunction<IpAddress> = (
    _index: number,
    item: IpAddress
  ): number => {
    if (item.isNetworkPrefix) {
      return item.value + 1000000000;
    }
    if (item.isBroadcastAddress) {
      return item.value + 2000000000;
    }
    return item.value;
  };

  ngOnChanges(_changes: SimpleChanges) {
    if (this.disabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }

    if (!this.showList) {
      return;
    }

    if (!this.subnetInfo) {
      return;
    }

    this.rowFormArray.clear();

    this.subnetInfo.ipAddressList.forEach((ipAddress) => {
      this.rowFormArray.push(
        new FormGroup({
          dnsEntryControl: new FormControl(),
          remarkControl: new FormControl(ipAddress.remarks),
        })
      );
    });
  }
}
