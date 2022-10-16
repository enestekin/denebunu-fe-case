import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  HANDLE_CHECKBOX_CHANGE,
  ADD_PRODUCTS,
  HANDLE_CATEGORY_CHECKBOX_CHANGE,
  REMOVE_PRODUCTS_FROM_CATEGORY,
} from './actions';
import { products } from '../utils/Products';

const AppContext = React.createContext();

localStorage.setItem('products', JSON.stringify(products));

const initialState = {
  products,
  categories: [
    { id: 1, title: 'Category 1', products: [], selectedProducts: [] },
  ],
  selectedProducts: [],
  headerMessage: 'Initial Screen',
  totalProducts: JSON.parse(localStorage.getItem('products')).length,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCategoryHandler = () => {
    dispatch({ type: ADD_CATEGORY });
  };

  const removeCategoryHandler = (categoryId) => {
    dispatch({ type: REMOVE_CATEGORY, payload: { categoryId } });
  };

  const checkboxChangeHandler = (productId) => {
    dispatch({ type: HANDLE_CHECKBOX_CHANGE, payload: { productId } });
  };

  const addProductsHandler = (categoryId) => {
    dispatch({ type: ADD_PRODUCTS, payload: { categoryId } });
  };

  const categoryCheckboxChangeHandler = (productId, categoryId) => {
    dispatch({
      type: HANDLE_CATEGORY_CHECKBOX_CHANGE,
      payload: { productId, categoryId },
    });
  };

  const removeProductsFromCategoryHandler = (categoryId) => {
    dispatch({ type: REMOVE_PRODUCTS_FROM_CATEGORY, payload: { categoryId } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addCategoryHandler,
        removeCategoryHandler,
        checkboxChangeHandler,
        addProductsHandler,
        categoryCheckboxChangeHandler,
        removeProductsFromCategoryHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext, initialState };
