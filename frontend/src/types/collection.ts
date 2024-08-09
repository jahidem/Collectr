import { Dispatch, SetStateAction } from "react";

export type CollectionUser = {
  id: string;
  firstname: string;
  lastname: string;
}

export type Collection = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  category: CollectionCatagory;
  user: CollectionUser;
}


export type CollectionCatagory = {
  id: string
  name: string;
}

