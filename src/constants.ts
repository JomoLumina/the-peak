import { SortOrder } from "./types/sortOrder";

export const SECTIONS = [{
  id: 1,
  name: 'sport',
  heading: 'Sports'
},
{
  id: 2,
  name: 'lifeandstyle',
  heading: 'Lifestyle'
},
{
  id: 3,
  name: 'culture',
  heading: 'Culture'
}]

export const oldest: SortOrder = {
  value: 'oldest',
  label: 'Oldest first'
};

export const newest: SortOrder = {
  value: 'newest',
  label: 'Newest first'
}

export const SortOrderList: SortOrder[] = [oldest, newest];
