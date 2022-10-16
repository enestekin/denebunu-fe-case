import { useAppContext } from '../context/appContext';
import Card from '../UI/Card';
import Checkbox from '../UI/Checkbox';

const AvailableProducts = () => {
  const { products, checkboxChangeHandler } = useAppContext();

  return (
    <Card>
      <h4>Available Products</h4>
      {products.length > 0 && (
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Checkbox
                  product={product}
                  handleCheckboxChange={() => checkboxChangeHandler(product.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default AvailableProducts;
