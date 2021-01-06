import { Component, EventEmitter, Input, Output } from '@angular/core';
import { saveAs } from 'file-saver';
import { SubnetInfo } from 'src/lib/calcsubnet';

@Component({
  selector: 'app-subnet-info',
  templateUrl: './subnet-info.component.html',
  //styleUrls: ['./subnet-info.component.scss'],
})
export class SubnetInfoComponent {
  @Input() subnetInfo: SubnetInfo | undefined;
  @Input() buttonDisabled = true;
  @Output() showList = new EventEmitter();
  @Output() downloadList = new EventEmitter();

  emitShowList() {
    this.showList.emit();
    //this.buttonDisabled = true;
  }

  emitDownloadList() {
    this.downloadList.emit();
  }

  onDownloadList(): void {
    if (this.subnetInfo) {
      saveAs(
        new Blob([this.subnetInfo.ipAddressListCsv().join('\r\n')], {
          type: 'text/csv;charset=utf-8',
          //endings: 'transparent',
        }),
        'Subnet_' +
          this.subnetInfo.networkAddress.dotDecimalString.replace(/\./g, '_') +
          '.csv'
      );
    }
  }
}
