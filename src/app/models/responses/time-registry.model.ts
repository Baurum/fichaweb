export class TimeRegistryModel {
  public startDate: string;
  public endDate: string;
  public entryTime: string;
  public exitTime: string;

  constructor(json_response: any) {
    this.deserialize(json_response);
  }

  public deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
