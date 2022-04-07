import { SortOrder } from "./types/sortOrder";

export const SECTIONS = [{
  id: 1,
  name: 'sport',
  heading: 'Sports',
  color: '#F50057'
},
{
  id: 2,
  name: 'lifeandstyle',
  heading: 'Lifestyle',
  color: '#2196F3'
},
{
  id: 3,
  name: 'culture',
  heading: 'Culture',
  color: '#FFCA28'
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
