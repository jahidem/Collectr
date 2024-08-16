import { User } from "./auth";
import { Collection, ItemField } from "./collection";

export type Item = {
  id: string;
  name: string;
  itemTags: ItemTag[];

  itemFields: ItemField[]
  likes: Like[]
  comments: Comment[]
  user: User | null
}

export type Like = {
  id: string;
  user: User;
}

export type Comment = {
  id: string;
  value: string;
  user: User
}
export type LatestItem = {
  id: string;
  name: string;
  itemTags: ItemTag[];

  collection: Collection;
  user: User
}

export type ItemTag = {
  id: string;
  name: string;
}