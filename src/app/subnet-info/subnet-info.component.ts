import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  emitShowList() {
    this.showList.emit();
    this.buttonDisabled = true;
  }
}
