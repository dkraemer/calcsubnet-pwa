import { Component } from '@angular/core';
import { SubnetInfo } from 'src/lib/calcsubnet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'calcsub.net';
  iconName = 'calculate';
  subnetInfo: SubnetInfo | undefined;
  subnetInfoForIPList: SubnetInfo | undefined;
  buttonDisabled = false;
  showList = false;

  onSubnetInfoChange(value: SubnetInfo) {
    this.subnetInfo = value;
  }

  onShowList() {
    this.showList = true;
  }

  onDirtyList() {}
}
