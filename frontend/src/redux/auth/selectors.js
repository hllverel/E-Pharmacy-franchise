export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectShopId = (state) => state.auth.shopId;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoading = (state) => state.auth.isLoading;