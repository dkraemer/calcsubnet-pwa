import { Component } from '@angular/core';
import { SubnetInfo } from 'src/lib/calcsubnet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputDisabled = false;
  subnetInfo: SubnetInfo | undefined;
  subnetInfoStatic: SubnetInfo | undefined;
  subnetInfoForIPList: SubnetInfo | undefined;
  buttonDisabled = false;
  showList = false;

  onSubnetInfoChange(value: SubnetInfo) {
    this.subnetInfo = value;
  }

  onShowList() {
    this.showList = true;
    const safeSubnetInfo = this.subnetInfo as SubnetInfo;
    this.subnetInfoStatic = new SubnetInfo(
      safeSubnetInfo.ipAddress,
      safeSubnetInfo.subnetMask
    );
  }

  onDirtyList() {}
}
