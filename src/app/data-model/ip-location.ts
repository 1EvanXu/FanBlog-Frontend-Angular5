export class IPLocation {
  city: string;
  province: string;
  country: string;

  prettify(): string {
    const city = this.city === '其他' ? '' : this.city;
    const province = this.province === '其他' ? '' : this.province;
    const country = this.country === '其他' ? '' : this.country;
    return `${city}, ${province}, ${country}`;
  }
}
