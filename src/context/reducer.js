import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  HANDLE_CHECKBOX_CHANGE,
  ADD_PRODUCTS,
  HANDLE_CATEGORY_CHECKBOX_CHANGE,
  REMOVE_PRODUCTS_FROM_CATEGORY,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === ADD_CATEGORY) {
    let newId = 1;
    state.categories &&
      state.categories.forEach((product) => {
        if (product.id === newId) {
          newId++;
        }
      });

    const newCategoryTitle = 'Category ' + newId;
    const newCategory = [
      {
        id: newId,
        title: newCategoryTitle,
        products: [],
        selectedProducts: [],
      },
    ];

    const updatedCategories = [...state.categories, ...newCategory];
    const newHeaderMessage = 'New Category Created';

    return {
      ...state,
      categories: updatedCategories,
      headerMessage: newHeaderMessage,
    };
  }

  if (action.type === REMOVE_CATEGORY) {
    const categoryIndex = state.categories.findIndex(
      (category) => action.payload.categoryId === category.id
    );
    const updatedCategory = state.categories[categoryIndex];
    const updatedProducts = [
      ...state.products,
      ...updatedCategory.products,
    ].sort((a, b) => a.id - b.id);

    const updatedCategories = state.categories.filter(
      (_, index) => index !== categoryIndex
    );

    const newHeaderMessage = `${updatedCategory.title} Removed - The End`;

    return {
      ...state,
      products: updatedProducts,
      categories: updatedCategories,
      headerMessage: newHeaderMessage,
    };
  }

  if (action.type === HANDLE_CHECKBOX_CHANGE) {
    let updatedSelectedProducts = state.selectedProducts;

    const isProductInArray =
      state.selectedProducts.length > 0 &&
      state.selectedProducts.find(
        (product) => product.id === action.payload.productId
      );

    if (!isProductInArray) {
      const currentProduct = state.products.find(
        (product) => product.id === action.payload.productId
      );
      updatedSelectedProducts.push(currentProduct);
    } else {
      updatedSelectedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload.productId
      );
    }

    const newHeaderMessage =
      state.totalProducts === state.products.length
        ? 'Products Selected'
        : 'Products Selected Again';

    return {
      ...state,
      selectedProducts: updatedSelectedProducts,
      headerMessage: newHeaderMessage,
    };
  }

  if (action.type === ADD_PRODUCTS) {
    const categoryIndex = state.categories.findIndex(
      (category) => category.id === action.payload.categoryId
    );
    const existingCategory = state.categories[categoryIndex];
    const existingCategoryProducts = state.categories[categoryIndex].products;

    const updatedCategory = {
      ...existingCategory,
      products: [...existingCategoryProducts, ...state.selectedProducts].sort(
        (a, b) => a.id - b.id
      ),
    };

    let updatedCategories = [...state.categories];
    updatedCategories[categoryIndex] = updatedCategory;

    const updatedProducts = state.products.filter(
      (product) => state.selectedProducts.indexOf(product) === -1
    );

    const newHeaderMessage = `Products Added to ${updatedCategory.title}`;

    return {
      ...state,
      products: updatedProducts,
      categories: updatedCategories,
      selectedProducts: [],
      headerMessage: newHeaderMessage,
    };
  }

  if (action.type === HANDLE_CATEGORY_CHECKBOX_CHANGE) {
    const updatedCategoryIndex = state.categories.findIndex(
      (item) => item.id === action.payload.categoryId
    );

    const updatedCategory = state.categories[updatedCategoryIndex];
    const isProductInArray =
      updatedCategory.selectedProducts.length > 0 &&
      updatedCategory.selectedProducts.find(
        (product) => product.id === action.payload.productId
      );

    if (!isProductInArray) {
      const currentProduct = updatedCategory.products.find(
        (product) => product.id === action.payload.productId
      );
      updatedCategory.selectedProducts.push(currentProduct);
    } else {
      updatedCategory.selectedProducts =
        updatedCategory.selectedProducts.filter(
          (product) => product.id !== action.payload.productId
        );
    }

    let updatedCategories = [...state.categories];
    updatedCategories[updatedCategoryIndex] = updatedCategory;

    const newHeaderMessage = `Product Selected in ${updatedCategory.title}`;

    return {
      ...state,
      categories: updatedCategories,
      headerMessage: newHeaderMessage,
    };
  }

  if (action.type === REMOVE_PRODUCTS_FROM_CATEGORY) {
    const updatedCategoryIndex = state.categories.findIndex(
      (item) => item.id === action.payload.categoryId
    );

    let updatedCategory = state.categories[updatedCategoryIndex];

    const updatedProducts = [
      ...state.products,
      ...updatedCategory.selectedProducts,
    ].sort((a, b) => a.id - b.id);

    updatedCategory.products = updatedCategory.products.filter(
      (product) => updatedCategory.selectedProducts.indexOf(product) === -1
    );

    const newHeaderMessage = `${
      updatedCategory.selectedProducts.length === 1
        ? '1 Product'
        : updatedCategory.selectedProducts.length + ' Products'
    } Removed From ${updatedCategory.title}`;
    updatedCategory.selectedProducts = [];

    let updatedCategories = [...state.categories];
    updatedCategories[updatedCategoryIndex] = updatedCategory;

    return {
      ...state,
      products: updatedProducts,
      categories: updatedCategories,
      headerMessage: newHeaderMessage,
    };
  }
  return { ...initialState };
};

export default reducer;
