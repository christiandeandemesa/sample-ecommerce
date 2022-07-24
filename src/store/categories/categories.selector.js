// Selects the categoriesMap from state in the categories reducer.
export const selectCategoriesMap = state =>
	// Takes the categoriesArray and turns it into an object.
	// Note that the first categories comes from the root reducer.
	state.categories.categories.reduce((acc, category) => {
		const {title, items} = category;

		acc[title.toLowerCase()] = items;

		return acc;
	}, {});
