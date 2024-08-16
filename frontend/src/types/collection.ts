import { User } from "./auth";



export type Collection = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  catagory: CollectionCatagory;
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
  itemFieldType: ItemFieldType;
  fieldValue: string | null;
}

export enum ItemFieldType {
  SELECT_FIELD = "SELECT_FIELD",
  INTEGER_FIELD = "INTEGER_FIELD",
  STRING_FIELD = "STRING_FIELD",
  MULTILINE_STRING_FIELD = "MULTILINE_STRING_FIELD",
  BOOLEAN_FIELD = "BOOLEAN_FIELD",
  DATE_FIELD = "DATE_FIELD"
}