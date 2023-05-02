import { CATEGORIES_ACTION_TYPES } from './category.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCategoriesMap = (categoryMap) =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATORIES_MAP, categoryMap);
