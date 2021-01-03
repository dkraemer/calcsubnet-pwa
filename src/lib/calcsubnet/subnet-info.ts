import { Dumpable } from './dumpable';
import { IpAddress } from './ip-address';
import { SubnetMask } from './subnet-mask';

export class SubnetInfo implements Dumpable {
  public readonly ipAddress: IpAddress;
  public readonly subnetMask: SubnetMask;
  public readonly networkAddress: IpAddress;
  public readonly firstAddress: IpAddress;
  public readonly lastAddress: IpAddress;
  public readonly broadcastAddress: IpAddress;

  constructor(ipAddress: IpAddress, subnetMask: SubnetMask) {
    this.ipAddress = ipAddress;
    this.subnetMask = subnetMask;

    // eslint-disable-next-line no-bitwise
    const networkAddressValue = (ipAddress.value & subnetMask.value) >>> 0;
    this.networkAddress = new IpAddress(networkAddressValue, true, false);
    this.firstAddress = new IpAddress(networkAddressValue + 1);

    // eslint-disable-next-line no-bitwise
    const broadcastAddressValue = (networkAddressValue | ~subnetMask.value) >>> 0;
    this.broadcastAddress = new IpAddress(broadcastAddressValue, false, true);
    this.lastAddress = new IpAddress(broadcastAddressValue - 1);
  }

  public static ipAddressList(
    ipAddress: IpAddress,
    subnetMask: SubnetMask
  ): Array<IpAddress> {
    const ipAddresses = new Array<IpAddress>();
    const subnetInfo = new SubnetInfo(ipAddress, subnetMask);

    let currentIpAddress = subnetInfo.networkAddress.value;

    while (true) {
      let isNetworkPrefix = false;
      let isBroadcastAddress = false;

      if (currentIpAddress === subnetInfo.networkAddress.value) {
        isNetworkPrefix = true;
      } else if (currentIpAddress === subnetInfo.broadcastAddress.value) {
        isBroadcastAddress = true;
      }

      ipAddresses.push(
        new IpAddress(currentIpAddress, isNetworkPrefix, isBroadcastAddress)
      );

      if (isBroadcastAddress) {
        break;
      }

      currentIpAddress++;
    }

    return ipAddresses;
  }

  public dump(): string[] {
    return [
      `ipAddress: ${this.ipAddress}`,
      `subnetMask: ${this.subnetMask}`,
      `networkAddress: ${this.networkAddress}`,
      `firstAddress: ${this.firstAddress}`,
      `lastAddress: ${this.lastAddress}`,
      `broadcastAddress: ${this.broadcastAddress}`,
    ];
  }
}
