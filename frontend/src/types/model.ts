export type Collection = {
  id: string
  title: string;
  imageId: string;
  description: string;
  catagory: CollectionCatagory;

  numberOfSelectField: number;
  numberOfIntegerField: number;
  numberOfStringField: number;
  numberOfBooleanField: number;
  numberOfMultilineStringField: number;

}

export type CollectionCatagory = {
  id: string
  name: string;
}