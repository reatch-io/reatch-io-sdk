export interface Attribute {
  key: string;
  value: any;
}

export interface Event {
  name: string;
  time: Date;
  attributes?: Attribute[];
}
