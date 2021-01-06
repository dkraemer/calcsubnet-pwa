import { DotDecimal } from './dot-decimal';

export class IpAddress extends DotDecimal {
  constructor(
    ipAddress: number,
    remarks: string = '',
    public dnsEntry = '',
    public isNetworkPrefix: boolean = false,
    public isBroadcastAddress: boolean = false
  ) {
    super(ipAddress, remarks);
  }

  public static fromString(dotDecimalString: string): IpAddress | undefined {
    return super.parse(IpAddress, dotDecimalString);
  }

  public dump(): string[] {
    const dump: string[] = super.dump();
    dump.push(
      `isNetworkPrefix: ${this.isNetworkPrefix}`,
      `isBroadcastAddress: ${this.isBroadcastAddress}`
    );
    return dump;
  }
}
