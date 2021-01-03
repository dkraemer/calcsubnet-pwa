import { Dumpable } from './dumpable';
import { Radix } from './radix';

export abstract class DotDecimal implements Dumpable {
  public readonly hexString: string;
  public readonly binString: string;
  public readonly octets: number[];
  public readonly dotDecimalString: string;

  protected constructor(public readonly value: number) {
    if (value < 0 || value > 0xffffffff) {
      throw new Error('Parameter value must be an unsigned integer (32 Bit)');
    }

    this.hexString = this.toHexString();
    this.binString = this.toBinString();
    this.octets = this.getOctets();
    this.dotDecimalString = this.toDotDecimalString();
  }

  public static parse<T extends DotDecimal>(t: new (numValue: number) => T, dotDecimalString: string): T | null {
    const regExp = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const octets = this.parseOctets(regExp, dotDecimalString, Radix.dec);
    if (!octets) {
      return null;
    }

    let hexValue = '0x';
    octets.forEach(e => {
      const octetHex = e.toString(Radix.hex);
      hexValue += octetHex.length === 1 ? '0' + octetHex : octetHex;
    });

    const value = Number.parseInt(hexValue, Radix.hex);
    try {
      return new t(value);
    } catch (error) {
      return null;
    }
  }

  private static parseOctets(regExp: RegExp, stringValue: string, radix: Radix): number[] | null {
    const regRepExecArray = regExp.exec(stringValue);
    if (!regRepExecArray) {
      return null;
    }

    const octetStrings = regRepExecArray.slice(1);
    if (octetStrings.length !== 4) {
      return null;
    }

    const retVal: number[] = [];
    octetStrings.forEach(e => {
      const result = Number.parseInt(e, radix);
      if (!Number.isNaN(result)) {
        retVal.push(result);
      }
    });

    return retVal.length === 4 ? retVal : null;
  }

  public toString(): string {
    return this.dotDecimalString;
  }

  public dump(): string[] {
    return [`value: ${this.value}`, `hexString: ${this.hexString}`, `dotDecimalString: ${this.dotDecimalString}`];
  }

  private toHexString(withPrefix: boolean = true): string {
    const prefix = withPrefix ? '0x' : '';
    return prefix + this.value.toString(Radix.hex).padStart(8, '0');
  }

  private toBinString(): string {
    return this.value.toString(Radix.bin).padStart(32, '0');
  }

  private getOctets(): number[] {
    const regExp = /^(.{2})(.{2})(.{2})(.{2})$/;
    const hexString = this.toHexString(false);
    const octets = DotDecimal.parseOctets(regExp, hexString, Radix.hex);
    if (!octets) {
      throw new Error();
    }
    return octets;
  }

  private toDotDecimalString(): string {
    const octets = this.getOctets();
    const octetStrings: string[] = [];

    octets.forEach(e => {
      octetStrings.push(e.toFixed());
    });

    return octetStrings.join('.');
  }
}
