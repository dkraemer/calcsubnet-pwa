import { DotDecimal } from './dot-decimal';

export class IpAddress extends DotDecimal {
  constructor(
    ipAddress: number,
    public readonly isNetworkPrefix: boolean = false,
    public readonly isBroadcastAddress: boolean = false
  ) {
    super(ipAddress);
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
