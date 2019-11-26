export class SessionResponseModel {
  public _id: string;
  public userId: string;

  constructor(json_response: any) {
    this.deserialize(json_response);
  }

  public deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
