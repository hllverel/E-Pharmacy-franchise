export const selectProducts = (state) => state.products.items;
export const selectCategories = (state) => state.products.categories;
export const selectProductsPage = (state) => state.products.page;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectIsProductsLoading = (state) => state.products.isLoading;