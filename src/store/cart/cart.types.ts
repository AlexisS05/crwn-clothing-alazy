import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
	SET_CART_ACTIVE = 'SET_CART_ACTIVE',
	SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
	SET_CART_ITEMS = 'SET_CART_ITEMS',
	SET_CART_COUNT = 'SET_CART_COUNT',
	SET_CART_TOTAL = 'SET_CART_TOTAL',
	CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS',
	SET_CART_ITEM_QUANTITY = 'SET_CART_ITEM_QUANTITY',
}

export type CartItems = CategoryItem & {
	quantity: number;
};

export type CartMap = {
	[key: string]: CartItems[];
};
