import AvailableProducts from './components/AvailableProducts.js';
import Category from './components/Category.js';
import Review from './components/Review.js';
import AddCategory from './components/AddCategory';
import { useAppContext } from './context/appContext';
import './assets/styles/App.scss';

export default function App() {
  const { categories, headerMessage } = useAppContext();

  return (
    <main>
      <h1>{headerMessage}</h1>
      <div className='container'>
        <div className='container__left-side'>
          <AvailableProducts />
          <Review />
        </div>
        <div className='container__right-side'>
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              products={category.products}
            />
          ))}
          <AddCategory />
        </div>
      </div>
    </main>
  );
}
