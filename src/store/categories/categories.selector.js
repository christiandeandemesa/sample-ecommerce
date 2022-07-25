import {createSelector} from 'reselect';

const selectCategoryReducer = state => state.categories;

export const selectCategories = createSelector(
	// Caches state[categories].
	[selectCategoryReducer],
	categoriesSlice => categoriesSlice.categories
);

// Selects categoriesMap from state in the categories reducer.
export const selectCategoriesMap = createSelector(
	// Caches what is cached in selectCategories.
	[selectCategories],
	// Takes the categoriesArray and turns it into an object only if it is different from the cached selectCategories.
	categories =>
		categories.reduce((acc, category) => {
			const {title, items} = category;

			acc[title.toLowerCase()] = items;

			return acc;
		}, {})
);
