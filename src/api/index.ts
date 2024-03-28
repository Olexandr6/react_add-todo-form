/* eslint-disable prettier/prettier */
import { Color } from '../types/Color';
import { GoodWithoutColor } from '../types/Good';

export const staticColors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export const goods: GoodWithoutColor[] = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

// export function getColors() {
//   return colors;
// }

export function getColors(): Promise<Color[]> {
  return fetch('http://localhost:3000/api/colors.json')
    .then(res => res.ok ? res.json() : Promise.reject(res.status));
}

export function getColorById(colorId: number): Promise<Color | undefined> {
  return getColors()
    .then(colors => colors.find(c => c.id === colorId));
}

export function getColorById1(colorId: number): Color | undefined {
  return staticColors.find(c => c.id === colorId);
}

export function getGoods() {
  return goods;
}
