import { Component, Input, OnInit } from '@angular/core';
import { SubnetInfo } from 'src/lib/calcsubnet';

@Component({
  selector: 'app-subnet-info',
  templateUrl: './subnet-info.component.html',
  styleUrls: ['./subnet-info.component.scss'],
})
export class SubnetInfoComponent implements OnInit {
  @Input() subnetInfo: SubnetInfo | undefined;

  constructor() {}

  ngOnInit(): void {}
}
