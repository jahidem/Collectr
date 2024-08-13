import { User } from "./auth";



export type Collection = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  category: CollectionCatagory;
  itemTemplate: ItemTemplate;
  user: User;
}


export type CollectionCatagory = {
  id: string
  name: string;
}

export type ItemTemplate = {
  id: string,
  collection: string;
  itemFields: ItemField[];

}

export type ItemField = {
  id: string;
  fieldName: string;
  itemFieldType: string;
  integerField: number | null;
  stringField: string | null;
  multilineStringField: string | null;
  booleanField: boolean | null;
}
