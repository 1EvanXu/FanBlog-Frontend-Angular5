import {ItemCollection} from './item-collection';

export class SideInformation {
  id: number;
  title: string;
  number?: number;


  constructor(id: number, title: string, number?: number) {
    this.id = id;
    this.title = title;
    this.number = number;
  }
}

export class SideInformationCollection implements ItemCollection{
  totalNumberOfItems: number;
  items: Array<SideInformation>;

}

