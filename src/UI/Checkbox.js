import { useState } from 'react';

const Checkbox = ({ product, handleCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeHandler = () => {
    setIsChecked(!isChecked);
    handleCheckboxChange();
  };

  return (
    <label htmlFor={product.id} className={isChecked ? 'active' : 'passive'}>
      <input
        type='checkbox'
        id={product.id}
        checked={isChecked}
        onChange={onChangeHandler}
      />
      {product.name}
    </label>
  );
};
export default Checkbox;
