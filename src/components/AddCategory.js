import '../assets/styles/AddCategory.scss';
import { useAppContext } from '../context/appContext';

const AddCategory = () => {
  const { addCategoryHandler } = useAppContext();

  return (
    <button
      className='add-categoryn-btn'
      type='button'
      onClick={addCategoryHandler}
    >
      Add Category
    </button>
  );
};
export default AddCategory;
