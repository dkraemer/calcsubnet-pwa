import { DotDecimal } from './dot-decimal';

export class IpAddress extends DotDecimal {
  constructor(ipAddress: number) {
    super(ipAddress);
  }
}
