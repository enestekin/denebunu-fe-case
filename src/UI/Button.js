import './Button.scss';

const Button = ({ children, isDisabled = false, onClickHandler }) => {
  return (
    <button
      className={isDisabled ? 'btn' : 'btn btn-active'}
      type='button'
      disabled={isDisabled}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
export default Button;
