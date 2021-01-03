import { DotDecimal } from './dot-decimal';

export class SubnetMask extends DotDecimal {
  /**
   * The maximum prefix length.
   */
  public static readonly maxPrefixLength: number = 32;

  /**
   * The numerical values of all valid subnet masks.
   */
  public static readonly allValidValues: readonly number[] = [
    0xffffffff,
    0xfffffffe,
    0xfffffffc,
    0xfffffff8,
    0xfffffff0,
    0xffffffe0,
    0xffffffc0,
    0xffffff80,
    0xffffff00,
    0xfffffe00,
    0xfffffc00,
    0xfffff800,
    0xfffff000,
    0xffffe000,
    0xffffc000,
    0xffff8000,
    0xffff0000,
    0xfffe0000,
    0xfffc0000,
    0xfff80000,
    0xfff00000,
    0xffe00000,
    0xffc00000,
    0xff800000,
    0xff000000,
    0xfe000000,
    0xfc000000,
    0xf8000000,
    0xf0000000,
    0xe0000000,
    0xc0000000,
    0x80000000,
    0x00000000,
  ];

  /**
   * All valid subnet masks.
   */
  public static readonly allValidMasks: readonly SubnetMask[] = [
    new SubnetMask(0xffffffff),
    new SubnetMask(0xfffffffe),
    new SubnetMask(0xfffffffc),
    new SubnetMask(0xfffffff8),
    new SubnetMask(0xfffffff0),
    new SubnetMask(0xffffffe0),
    new SubnetMask(0xffffffc0),
    new SubnetMask(0xffffff80),
    new SubnetMask(0xffffff00),
    new SubnetMask(0xfffffe00),
    new SubnetMask(0xfffffc00),
    new SubnetMask(0xfffff800),
    new SubnetMask(0xfffff000),
    new SubnetMask(0xffffe000),
    new SubnetMask(0xffffc000),
    new SubnetMask(0xffff8000),
    new SubnetMask(0xffff0000),
    new SubnetMask(0xfffe0000),
    new SubnetMask(0xfffc0000),
    new SubnetMask(0xfff80000),
    new SubnetMask(0xfff00000),
    new SubnetMask(0xffe00000),
    new SubnetMask(0xffc00000),
    new SubnetMask(0xff800000),
    new SubnetMask(0xff000000),
    new SubnetMask(0xfe000000),
    new SubnetMask(0xfc000000),
    new SubnetMask(0xf8000000),
    new SubnetMask(0xf0000000),
    new SubnetMask(0xe0000000),
    new SubnetMask(0xc0000000),
    new SubnetMask(0x80000000),
    new SubnetMask(0x00000000),
  ];

  /**
   * The prefix length of this subnet mask.
   */
  public readonly prefixLength: number;

  /**
   * The number of bits reserved for host addresses.
   */
  public readonly hostBitCount: number;

  /**
   * The number of host addresses.
   */
  public readonly hostAddressCount: number;

  /**
   * The number of usable host addresses.
   */
  public readonly usableHostAddressCount: number;

  /**
   * Remarks for this subnet mask.
   */
  public readonly remark: string;

  /**
   * Create a new instance of SubnetMask.
   *
   * @param value The integer value of the subnet mask to create.
   */
  public constructor(value: number) {
    SubnetMask.validate(value);
    super(value);
    this.prefixLength = SubnetMask.getPrefixLength(value, false);
    this.hostBitCount = SubnetMask.maxPrefixLength - this.prefixLength;
    this.hostAddressCount = 2 ** this.hostBitCount;
    this.usableHostAddressCount = this.hostAddressCount - 2;

    switch (this.prefixLength) {
      case 32:
        this.usableHostAddressCount = 1;
        this.remark = '(Host route)';
        break;
      case 31:
        this.usableHostAddressCount = 2;
        this.remark = '(Point-to-point links (RFC 3021))';
        break;
      case 30:
        this.remark = '(Point-to-point links (glue network))';
        break;
      case 8:
        this.remark = '(Largest IANA block allocation)';
        break;
      default:
        this.remark = '';
        break;
    }
  }

  /**
   * Validate a subnet mask.
   *
   * @param value The integer value of the subnet mask to validate.
   * @param shouldThrow When true (default) an error is thrown when the given subnet mask is invalid.
   * @returns True when the subnet mask is valid or false when it is not.
   */
  public static validate(value: number, shouldThrow: boolean = true): boolean {
    if (SubnetMask.allValidValues.includes(value)) {
      return true;
    }
    if (shouldThrow) {
      throw new Error('Invalid subnet mask!');
    }
    return false;
  }

  /**
   * Get the prefix length for a subnet mask.
   *
   * @param value The integer value of the subnet mask.
   * @param shouldValidate When true (default) the subnet mask will be validated.
   * @param shouldThrow When true (default) an error is thrown if the subnet mask is invalid.
   * @returns The prefix length.
   */
  public static getPrefixLength(value: number, shouldValidate: boolean = true, shouldThrow: boolean = true): number {
    if (shouldValidate) {
      SubnetMask.validate(value, shouldThrow);
    }
    // Convert value to binary string and count how many bits are set
    return value.toString(2).split('1').length - 1;
  }

  /**
   * Dump all public properties' values in a human-readable format.
   *
   * @returns An Array<String> containing the dump.
   */
  public dump(): string[] {
    const dump: string[] = super.dump();
    dump.push(
      `prefixLength: ${this.prefixLength}`,
      `hostBitCount: ${this.hostBitCount}`,
      `hostAddressCount: ${this.hostAddressCount}`,
      `usableHostAddressCount: ${this.usableHostAddressCount}`,
      `remark: ${this.remark}`
    );
    return dump;
  }
}
