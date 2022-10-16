import { useAppContext } from '../context/appContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Checkbox from '../UI/Checkbox';

const Category = ({ category }) => {
  const {
    removeCategoryHandler,
    addProductsHandler,
    removeProductsFromCategoryHandler,
    selectedProducts,
    categoryCheckboxChangeHandler,
  } = useAppContext();

  return (
    <Card styles='category'>
      <h4>{category.title}</h4>
      {category.products.length === 0 && (
        <div className='category__background-text'>
          Select products to add here.
        </div>
      )}
      {category.products.length > 0 && (
        <ul>
          {category.products.map((product) => {
            return (
              <li key={product.id}>
                <Checkbox
                  product={product}
                  handleCheckboxChange={() =>
                    categoryCheckboxChangeHandler(product.id, category.id)
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
      <div className='category__buttons'>
        <div>
          <Button
            isDisabled={selectedProducts.length === 0}
            onClickHandler={() => addProductsHandler(category.id)}
          >
            Add {selectedProducts.length > 0 && selectedProducts.length}{' '}
            Products
          </Button>
          <Button
            isDisabled={category.selectedProducts.length === 0}
            onClickHandler={() =>
              removeProductsFromCategoryHandler(category.id)
            }
          >
            Remove{' '}
            {category.selectedProducts.length > 0 &&
              category.selectedProducts.length}{' '}
            Products
          </Button>
        </div>
        <Button onClickHandler={() => removeCategoryHandler(category.id)}>
          Remove Category
        </Button>
      </div>
    </Card>
  );
};

export default Category;
