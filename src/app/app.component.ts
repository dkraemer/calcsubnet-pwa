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

  onSubnetInfoChange(value: SubnetInfo) {
    this.subnetInfo = value;
  }
}
