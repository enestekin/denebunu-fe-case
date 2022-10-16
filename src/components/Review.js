import { useAppContext } from '../context/appContext';
import Card from '../UI/Card';

const Review = () => {
  const { categories, products } = useAppContext();

  return (
    <Card styles='review'>
      <h4>Review</h4>
      <p>Available Products: {products.length}</p>
      <p>Categories: {categories.length}</p>
      {categories.length > 0 && (
        <ul>
          {categories.map((category, index) => {
            return (
              <li key={index}>
                {category.title}:{' '}
                {category.products.length <= 1
                  ? category.products.length + ' product'
                  : category.products.length + ' products'}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default Review;
